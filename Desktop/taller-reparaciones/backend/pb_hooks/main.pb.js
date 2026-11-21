/// <reference path="../pb_data/types.d.ts" />

onRecordUpdateRequest((e) => {
    const original = e.record.original();
    if (!original) return e.next();

    const estadoAnterior = original.get("estado");
    const estadoNuevo = e.record.get("estado");

    // 1. Estados terminales no cambian
    if (["rechazada", "cancelada", "entregada"].includes(estadoAnterior)) {
        throw new BadRequestError("Esta orden ya está cerrada y no puede cambiar.");
    }

    if (estadoAnterior === estadoNuevo) return e.next();

    // 2. Validar transiciones permitidas
    const transiciones = {
        "solicitada": ["en_diagnostico", "cancelada"],
        "en_diagnostico": ["presupuestada"],
        "presupuestada": ["aprobada", "rechazada"],
        "aprobada": ["en_reparacion"],
        "en_reparacion": ["lista"],
        "lista": ["entregada"],
    };
    const permitidas = transiciones[estadoAnterior] || [];
    if (!permitidas.includes(estadoNuevo)) {
        throw new BadRequestError(`Transición no permitida: ${estadoAnterior} → ${estadoNuevo}`);
    }

    // 3. Al presupuestar, exigir campos completos
    if (estadoNuevo === "presupuestada") {
        if (!e.record.get("diagnostico") || e.record.get("manoObra") === null || !e.record.get("piezas")) {
            throw new BadRequestError("Debe registrar diagnóstico, mano de obra y piezas para presupuestar.");
        }
    }

    // 4. Bloquear modificación del presupuesto una vez registrado
    if (estadoAnterior !== "en_diagnostico" && estadoAnterior !== "solicitada") {
        if (e.record.get("diagnostico") !== original.get("diagnostico") ||
            e.record.get("manoObra") !== original.get("manoObra") ||
            JSON.stringify(e.record.get("piezas")) !== JSON.stringify(original.get("piezas"))) {
            throw new BadRequestError("El presupuesto no se puede modificar una vez registrado.");
        }
    }

    e.next();

    // 5. Crear evento automáticamente
    try {
        const evento = new Record(e.app.findCollectionByNameOrId("eventos"));
        evento.set("orden", e.record.id);
        evento.set("de", estadoAnterior);
        evento.set("a", estadoNuevo);
        e.app.save(evento);
    } catch (err) {
        console.log("Error al crear evento:", err);
    }
}, "ordenes");