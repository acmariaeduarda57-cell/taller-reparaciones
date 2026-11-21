import { useEffect, useState } from "react";
import { getOrdenes } from "../api";

export default function ResumenEtapas() {
    const [ordenes, setOrdenes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { getOrdenes().then(setOrdenes).catch((e) => setError(e.message)).finally(() => setCargando(false)); }, []);

    if (cargando) return <p>Cargando resumen...</p>;
    if (error) return <p className="error">{error}</p>;

    const conteo = ordenes.reduce((acc, o) => { acc[o.estado] = (acc[o.estado] || 0) + 1; return acc; }, {});

    return (
        <div>
            <h2>Resumen por Etapa</h2>
            {ordenes.length === 0 ? <p>No hay órdenes registradas.</p> : (
                <ul className="resumen-lista">{Object.entries(conteo).map(([estado, cantidad]) => <li key={estado}><strong>{estado}:</strong> {cantidad}</li>)}</ul>
            )}
            <p><strong>Total de órdenes:</strong> {ordenes.length}</p>
        </div>
    );
}