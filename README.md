# Taller de Reparaciones — React + PocketBase

Proyecto del Segundo Parcial de Programación Web.

## Requisitos previos
- Node.js 20+
- PocketBase 0.41+

## Levantar el backend (PocketBase)
1. Coloca el binario de PocketBase en `backend/`.
2. Ejecuta `./pocketbase serve` (o `.\pocketbase.exe serve` en Windows).
3. Las migraciones en `pb_migrations/` se aplican automáticamente (esquema y datos de prueba).
4. Los hooks en `pb_hooks/` se cargan al iniciar.
5. Panel de administración: `http://127.0.0.1:8090/_/`.

## Levantar el frontend (React)
1. Entra a `frontend/`.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre `http://localhost:5173`.

## Seguridad
- Las reglas de API bloquean el borrado de órdenes y la edición/borrado de eventos.
- El hook `pb_hooks/main.pb.js` valida las transiciones de estado y crea los eventos automáticamente.
- El presupuesto no se puede modificar una vez registrado.

## Estructura
- `backend/pb_migrations/`: esquema y datos de prueba.
- `backend/pb_hooks/main.pb.js`: validación de transiciones y creación de eventos.
- `frontend/src/api.js`: capa de peticiones `fetch`.
- `frontend/src/components/`: Layout, EstadoBadge, PresupuestoForm.
- `frontend/src/pages/`: ListaOrdenes, DetalleOrden, CrearOrden, CrearCliente, ResumenEtapas, NotFound.
