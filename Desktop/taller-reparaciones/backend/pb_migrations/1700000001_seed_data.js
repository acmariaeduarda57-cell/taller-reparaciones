/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const clientesCol = app.findCollectionByNameOrId("clientes");
    const juan = new Record(clientesCol); juan.set("nombre", "Juan Pérez"); juan.set("telefono", "555-1234"); app.save(juan);
    const maria = new Record(clientesCol); maria.set("nombre", "María López"); maria.set("telefono", "555-5678"); app.save(maria);

    const ordenesCol = app.findCollectionByNameOrId("ordenes");
    const o1 = new Record(ordenesCol); o1.set("cliente", juan.id); o1.set("equipo", "Laptop HP"); o1.set("problema", "No enciende"); o1.set("estado", "solicitada"); app.save(o1);
    const o2 = new Record(ordenesCol); o2.set("cliente", maria.id); o2.set("equipo", "iPhone 12"); o2.set("problema", "Pantalla rota"); o2.set("estado", "en_diagnostico"); app.save(o2);
    const o3 = new Record(ordenesCol); o3.set("cliente", juan.id); o3.set("equipo", "TV Samsung"); o3.set("problema", "Sin imagen"); o3.set("estado", "presupuestada"); o3.set("diagnostico", "Fuente dañada"); o3.set("manoObra", 50); o3.set("piezas", [{ descripcion: "Fuente", cantidad: 1, precio: 80 }]); app.save(o3);
}, (app) => {
    // Rollback: eliminar los registros creados
    try {
        app.findRecordsByFilter("ordenes", "", "", 100, 0).forEach(r => app.delete(r));
        app.findRecordsByFilter("clientes", "", "", 100, 0).forEach(r => app.delete(r));
    } catch (e) {}
});