/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    // Colección: clientes (todo público)
    const clientes = new Collection({
        name: "clientes",
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: "",
        deleteRule: "",
        fields: [
            { name: "nombre", type: "text", required: true },
            { name: "telefono", type: "text", required: true },
        ],
    });
    app.save(clientes);

    // Colección: ordenes (solo Delete bloqueado)
    const ordenes = new Collection({
        name: "ordenes",
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: "",
        deleteRule: null, // Bloqueado: nadie puede borrar órdenes
        fields: [
            { name: "cliente", type: "relation", required: true, collectionId: clientes.id, maxSelect: 1, cascadeDelete: false },
            { name: "equipo", type: "text", required: true },
            { name: "problema", type: "text", required: true },
            { name: "estado", type: "select", required: true, values: ["solicitada", "en_diagnostico", "presupuestada", "aprobada", "rechazada", "en_reparacion", "lista", "entregada", "cancelada"], maxSelect: 1 },
            { name: "diagnostico", type: "text" },
            { name: "manoObra", type: "number" },
            { name: "piezas", type: "json" },
            { name: "fotos", type: "file", maxSelect: 3, maxSize: 5242880, mimeTypes: ["image/jpeg", "image/png", "image/webp"] },
        ],
    });
    app.save(ordenes);

    // Colección: eventos (Update y Delete bloqueados)
    const eventos = new Collection({
        name: "eventos",
        type: "base",
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: null, // Bloqueado: historial inmutable
        deleteRule: null, // Bloqueado: historial inmutable
        fields: [
            { name: "orden", type: "relation", required: true, collectionId: ordenes.id, maxSelect: 1, cascadeDelete: false },
            { name: "de", type: "text" },
            { name: "a", type: "text", required: true },
        ],
    });
    app.save(eventos);
}, (app) => {
    try { app.delete(app.findCollectionByNameOrId("eventos")); } catch (e) {}
    try { app.delete(app.findCollectionByNameOrId("ordenes")); } catch (e) {}
    try { app.delete(app.findCollectionByNameOrId("clientes")); } catch (e) {}
});