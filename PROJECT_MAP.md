# Luaj Tahará — Mapa del proyecto

## Fuente maestra
- Repositorio: Nathas18/Calendario-Taharat-Hamishpaja
- Rama de producción: `main`
- GitHub es la fuente maestra del código y del historial.
- Cloudflare Pages publica la rama `main`; no se usa como segundo lugar de edición.
- Dominio público: luajtahara.com.

## Flujo de publicación
Cambio aprobado → commit en GitHub `main` → Cloudflare Pages construye/publica → luajtahara.com → PWA instalada.

## Regla de trabajo
1. Revisar el código actual antes de modificar.
2. Separar cambios visuales/contenido de cambios en cálculos halájicos.
3. Un cambio lógico importante debe quedar identificado en un commit.
4. Verificar el deployment antes de considerar un cambio publicado.
5. No borrar datos locales ni pedir reinstalación de la PWA como procedimiento normal.

## Componentes que deben permanecer identificados
- Calendario y cálculo de onot.
- Veset HaJódesh / Kavúa.
- Haflagá y Kavúa de Haflagá.
- Oná Beinonit.
- Veset HaShavúa.
- Or Zarúa, Creti Upleti y Haflagá Aruká.
- Historial y exportación PDF.
- Configuración y notificaciones.
- Autenticación/usuarios.
- PWA: manifest, service worker y caché.
- Secciones auxiliares: Bodeket, Jajamim, Tevilot y Halajot (pendiente localizar su implementación exacta en el historial/código desplegado antes de editarla).

## Punto de restauración protegido
El commit `2b2b18a9fdb2e149a288d9cc9744763c98d2c826` se conserva como referencia anterior a cambios problemáticos del ciclo de vida de Kavúa. No debe alterarse.

## Publicación
Cloudflare Pages debe permanecer conectado a GitHub `main`. El código no debe mantenerse manualmente en dos sitios distintos.
