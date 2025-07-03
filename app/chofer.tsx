import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "./adapters/stores/authStore";
import { Boleto } from "./core/domain/Boleto";
import { Frecuencia } from "./core/domain/Frecuencia";
import { BoletoService } from "./core/infrastructure/BoletoService";
import { FrecuenciaService } from "./core/infrastructure/FrecuenciaService";

interface PasajeroInfo {
    boleto: Boleto;
    validado: boolean;
}

interface FrecuenciaConPasajeros extends Frecuencia {
    pasajeros: PasajeroInfo[];
    totalPasajeros: number;
    pasajerosValidados: number;
    pasajerosNoValidados: number;
}

export default function ChoferScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [frecuencias, setFrecuencias] = useState<FrecuenciaConPasajeros[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedFrecuencia, setSelectedFrecuencia] = useState<FrecuenciaConPasajeros | null>(null);
    const [filtroValidacion, setFiltroValidacion] = useState<'todos' | 'validados' | 'pendientes'>('todos');

    const frecuenciaService = new FrecuenciaService();
    const boletoService = new BoletoService();

    const getFiltroEmptyMessage = () => {
        switch (filtroValidacion) {
            case 'validados':
                return 'No hay pasajeros validados';
            case 'pendientes':
                return 'No hay pasajeros pendientes';
            default:
                return 'No hay pasajeros registrados';
        }
    };

    const cargarFrecuenciasDelConductor = async () => {
        if (!user?.usuario_id) return;

        try {
            setLoading(true);
            const frecuenciasData = await frecuenciaService.getFrecuenciasByConductor(user.usuario_id);
            
            // Por cada frecuencia, obtener los boletos asociados
            const frecuenciasConPasajeros: FrecuenciaConPasajeros[] = await Promise.all(
                frecuenciasData.map(async (frecuencia: Frecuencia) => {
                    try {
                        const boletos = await boletoService.getBoletosByFrecuencia(frecuencia.frecuencia_id?.toString() || '0');
                        
                        const pasajeros: PasajeroInfo[] = boletos.map(boleto => ({
                            boleto,
                            validado: boleto.estado === 'validado' || boleto.estado === 'usado'
                        }));

                        return {
                            ...frecuencia,
                            pasajeros,
                            totalPasajeros: pasajeros.length,
                            pasajerosValidados: pasajeros.filter(p => p.validado).length,
                            pasajerosNoValidados: pasajeros.filter(p => !p.validado).length,
                        };
                    } catch (error) {
                        console.error(`Error al cargar boletos para frecuencia ${frecuencia.frecuencia_id}:`, error);
                        return {
                            ...frecuencia,
                            pasajeros: [],
                            totalPasajeros: 0,
                            pasajerosValidados: 0,
                            pasajerosNoValidados: 0,
                        };
                    }
                })
            );

            setFrecuencias(frecuenciasConPasajeros);
        } catch (error) {
            console.error('Error al cargar frecuencias:', error);
        } finally {
            setLoading(false);
        }
    };

    const validarBoleto = async (boletoId: string) => {
        try {
            await boletoService.validateBoleto(boletoId);
            // Actualizar el estado local
            if (selectedFrecuencia) {
                const updatedPasajeros = selectedFrecuencia.pasajeros.map(p => 
                    p.boleto.boleto_id?.toString() === boletoId 
                        ? { ...p, validado: true, boleto: { ...p.boleto, estado: 'validado' } }
                        : p
                );
                
                const updatedFrecuencia = {
                    ...selectedFrecuencia,
                    pasajeros: updatedPasajeros,
                    pasajerosValidados: updatedPasajeros.filter(p => p.validado).length,
                    pasajerosNoValidados: updatedPasajeros.filter(p => !p.validado).length,
                };
                
                setSelectedFrecuencia(updatedFrecuencia);
                
                // También actualizar en la lista principal
                setFrecuencias(prev => prev.map(f => 
                    f.frecuencia_id === selectedFrecuencia.frecuencia_id 
                        ? updatedFrecuencia 
                        : f
                ));
            }
        } catch (error) {
            console.error('Error al validar boleto:', error);
            // Aquí podrías mostrar un alert o toast con el error
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await cargarFrecuenciasDelConductor();
        setRefreshing(false);
    };

    useEffect(() => {
        cargarFrecuenciasDelConductor();
    }, [user]);

    const renderFrecuenciaItem = ({ item }: { item: FrecuenciaConPasajeros }) => (
        <TouchableOpacity
            className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100"
            onPress={() => setSelectedFrecuencia(item)}
            activeOpacity={0.7}
        >
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Inter" }}>
                    {item.nombre_frecuencia}
                </Text>
                <View className="bg-blue-100 px-2 py-1 rounded">
                    <Text className="text-blue-600 text-xs font-medium" style={{ fontFamily: "Inter" }}>
                        {item.es_directo ? "Directo" : "Con paradas"}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between mb-3">
                <View className="flex-1">
                    <Text className="text-sm text-gray-500" style={{ fontFamily: "Inter" }}>
                        🚌 {item.origen} → {item.destino}
                    </Text>
                    <Text className="text-sm text-gray-500" style={{ fontFamily: "Inter" }}>
                        🕐 {item.hora_salida} - {item.hora_llegada}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between pt-2 border-t border-gray-100">
                <View className="flex-row items-center">
                    <Text className="text-sm text-gray-600 mr-4" style={{ fontFamily: "Inter" }}>
                        👥 Total: {item.totalPasajeros}
                    </Text>
                    <Text className="text-sm text-green-600 mr-4" style={{ fontFamily: "Inter" }}>
                        ✅ {item.pasajerosValidados}
                    </Text>
                    <Text className="text-sm text-red-600" style={{ fontFamily: "Inter" }}>
                        ❌ {item.pasajerosNoValidados}
                    </Text>
                </View>
                <Text className="text-blue-500 text-sm font-medium" style={{ fontFamily: "Inter" }}>
                    Ver detalles →
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderPasajeroItem = ({ item }: { item: PasajeroInfo }) => (
        <View className={`p-3 mb-2 rounded-lg border ${item.validado ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <View className="flex-row justify-between items-start">
                <View className="flex-1">
                    <Text className="font-medium text-gray-800" style={{ fontFamily: "Inter" }}>
                        {item.boleto.usuario?.primer_nombre} {item.boleto.usuario?.primer_apellido}
                    </Text>
                    <Text className="text-sm text-gray-600" style={{ fontFamily: "Inter" }}>
                        Asientos: {item.boleto.asientos}
                    </Text>
                    <Text className="text-sm text-gray-600" style={{ fontFamily: "Inter" }}>
                        Cantidad: {item.boleto.cantidad_asientos}
                    </Text>
                </View>
                <View className="items-end">
                    <Text className={`text-sm font-medium ${item.validado ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: "Inter" }}>
                        {item.validado ? '✅ Validado' : '❌ Pendiente'}
                    </Text>
                    <Text className="text-xs text-gray-500 mb-2" style={{ fontFamily: "Inter" }}>
                        ${item.boleto.total}
                    </Text>
                    {!item.validado && (
                        <TouchableOpacity
                            onPress={() => validarBoleto(item.boleto.boleto_id?.toString() || '')}
                            className="bg-blue-500 px-3 py-1 rounded-md"
                            activeOpacity={0.7}
                        >
                            <Text className="text-white text-xs font-medium" style={{ fontFamily: "Inter" }}>
                                Validar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-gray-600" style={{ fontFamily: "Inter" }}>
                    Cargando rutas...
                </Text>
            </SafeAreaView>
        );
    }

    if (selectedFrecuencia) {
        const pasajerosFiltrados = selectedFrecuencia.pasajeros.filter(pasajero => {
            if (filtroValidacion === 'validados') return pasajero.validado;
            if (filtroValidacion === 'pendientes') return !pasajero.validado;
            return true; // 'todos'
        });

        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="px-4 py-3 bg-white border-b border-gray-200">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            onPress={() => setSelectedFrecuencia(null)}
                            className="p-2"
                        >
                            <Text className="text-blue-500 text-lg" style={{ fontFamily: "Inter" }}>
                                ← Volver
                            </Text>
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Inter" }}>
                            Pasajeros
                        </Text>
                        <View className="w-16" />
                    </View>
                    
                    <View className="mt-2">
                        <Text className="text-base font-medium text-gray-800" style={{ fontFamily: "Inter" }}>
                            {selectedFrecuencia.nombre_frecuencia}
                        </Text>
                        <Text className="text-sm text-gray-600" style={{ fontFamily: "Inter" }}>
                            {selectedFrecuencia.origen} → {selectedFrecuencia.destino}
                        </Text>
                    </View>

                    <View className="flex-row justify-around mt-3 pt-3 border-t border-gray-100">
                        <View className="items-center">
                            <Text className="text-xl font-bold text-gray-800" style={{ fontFamily: "Inter" }}>
                                {selectedFrecuencia.totalPasajeros}
                            </Text>
                            <Text className="text-xs text-gray-500" style={{ fontFamily: "Inter" }}>
                                Total
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-xl font-bold text-green-600" style={{ fontFamily: "Inter" }}>
                                {selectedFrecuencia.pasajerosValidados}
                            </Text>
                            <Text className="text-xs text-gray-500" style={{ fontFamily: "Inter" }}>
                                Validados
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-xl font-bold text-red-600" style={{ fontFamily: "Inter" }}>
                                {selectedFrecuencia.pasajerosNoValidados}
                            </Text>
                            <Text className="text-xs text-gray-500" style={{ fontFamily: "Inter" }}>
                                Pendientes
                            </Text>
                        </View>
                    </View>

                    {/* Filtros */}
                    <View className="flex-row justify-center mt-3 pt-3 border-t border-gray-100">
                        <TouchableOpacity
                            onPress={() => setFiltroValidacion('todos')}
                            className={`px-4 py-2 rounded-full mr-2 ${filtroValidacion === 'todos' ? 'bg-blue-500' : 'bg-gray-200'}`}
                        >
                            <Text className={`text-sm font-medium ${filtroValidacion === 'todos' ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: "Inter" }}>
                                Todos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFiltroValidacion('validados')}
                            className={`px-4 py-2 rounded-full mr-2 ${filtroValidacion === 'validados' ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            <Text className={`text-sm font-medium ${filtroValidacion === 'validados' ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: "Inter" }}>
                                Validados
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setFiltroValidacion('pendientes')}
                            className={`px-4 py-2 rounded-full ${filtroValidacion === 'pendientes' ? 'bg-red-500' : 'bg-gray-200'}`}
                        >
                            <Text className={`text-sm font-medium ${filtroValidacion === 'pendientes' ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: "Inter" }}>
                                Pendientes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={pasajerosFiltrados}
                    renderItem={renderPasajeroItem}
                    keyExtractor={(item, index) => `${item.boleto.boleto_id}-${index}`}
                    contentContainerStyle={{ padding: 16 }}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20">
                            <Text className="text-gray-500 text-lg" style={{ fontFamily: "Inter" }}>
                                {getFiltroEmptyMessage()}
                            </Text>
                        </View>
                    }
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="px-4 py-3 bg-white border-b border-gray-200">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2"
                    >
                        <Text className="text-blue-500 text-lg" style={{ fontFamily: "Inter" }}>
                            ← Volver
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Inter" }}>
                        Mis Rutas
                    </Text>
                    <View className="w-16" />
                </View>
                <Text className="text-sm text-gray-600 mt-1 text-center" style={{ fontFamily: "Inter" }}>
                    Rutas asignadas y estado de pasajeros
                </Text>
                
                {/* Estadísticas generales */}
                {frecuencias.length > 0 && (
                    <View className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <Text className="text-base font-semibold text-blue-800 mb-2" style={{ fontFamily: "Inter" }}>
                            📊 Resumen General
                        </Text>
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <Text className="text-lg font-bold text-blue-800" style={{ fontFamily: "Inter" }}>
                                    {frecuencias.length}
                                </Text>
                                <Text className="text-xs text-blue-600" style={{ fontFamily: "Inter" }}>
                                    Rutas
                                </Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-lg font-bold text-blue-800" style={{ fontFamily: "Inter" }}>
                                    {frecuencias.reduce((total, f) => total + f.totalPasajeros, 0)}
                                </Text>
                                <Text className="text-xs text-blue-600" style={{ fontFamily: "Inter" }}>
                                    Pasajeros
                                </Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-lg font-bold text-green-600" style={{ fontFamily: "Inter" }}>
                                    {frecuencias.reduce((total, f) => total + f.pasajerosValidados, 0)}
                                </Text>
                                <Text className="text-xs text-blue-600" style={{ fontFamily: "Inter" }}>
                                    Validados
                                </Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-lg font-bold text-red-600" style={{ fontFamily: "Inter" }}>
                                    {frecuencias.reduce((total, f) => total + f.pasajerosNoValidados, 0)}
                                </Text>
                                <Text className="text-xs text-blue-600" style={{ fontFamily: "Inter" }}>
                                    Pendientes
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>

            <FlatList
                data={frecuencias}
                renderItem={renderFrecuenciaItem}
                keyExtractor={(item) => item.frecuencia_id?.toString() || ''}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <Text className="text-gray-500 text-lg mb-2" style={{ fontFamily: "Inter" }}>
                            No tienes rutas asignadas
                        </Text>
                        <Text className="text-gray-400 text-sm text-center" style={{ fontFamily: "Inter" }}>
                            Contacta con tu administrador para que te asigne rutas
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
