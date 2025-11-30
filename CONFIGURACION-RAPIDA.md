# ⚡ Configuración Rápida - Ortomediq

Esta guía te ayudará a configurar rápidamente Google Maps y WhatsApp en tu sitio web.

## 📋 Checklist de Configuración

### ✅ 1. WhatsApp (YA CONFIGURADO)
- [x] Componente `WhatsAppButton.jsx` creado
- [x] Número de WhatsApp configurado: `+52 871 576 6792`
- [x] Mensaje de bienvenida personalizado
- [x] Botón flotante funcionando
- [x] Enlace en sección de contacto

**Estado**: ✅ COMPLETADO

---

### ⚙️ 2. Google Maps (REQUIERE CONFIGURACIÓN)

#### Paso 1: Obtener API Key (5 minutos)

1. **Ir a Google Cloud Console**
   - 🔗 https://console.cloud.google.com/

2. **Crear o seleccionar proyecto**
   - Click en el menú desplegable de proyectos (arriba)
   - "Nuevo Proyecto" → Nombre: "Ortomediq"

3. **Habilitar Maps JavaScript API**
   - Menú → APIs & Services → Library
   - Buscar: "Maps JavaScript API"
   - Click en "ENABLE"

4. **Crear API Key**
   - Menú → APIs & Services → Credentials
   - "Create Credentials" → "API Key"
   - **¡COPIAR LA API KEY!**

5. **Restringir API Key (IMPORTANTE)**
   - Click en la API Key recién creada
   - Application restrictions:
     - Seleccionar "HTTP referrers"
     - Agregar: `http://localhost:5173/*`
     - Agregar: `https://tudominio.com/*` (cuando tengas dominio)
   - API restrictions:
     - Seleccionar "Restrict key"
     - Marcar solo: "Maps JavaScript API"
   - Guardar

#### Paso 2: Configurar archivo .env (1 minuto)

1. **Crear archivo `.env` en la raíz del proyecto**
   ```bash
   # En la terminal:
   touch .env
   ```

2. **Agregar la API Key**
   ```env
   VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
   ```

3. **Guardar el archivo**

#### Paso 3: Obtener coordenadas exactas (2 minutos)

1. **Ir a Google Maps**
   - 🔗 https://www.google.com/maps

2. **Buscar tu negocio**
   - Buscar: "Ortomediq Torreón" o tu dirección exacta

3. **Obtener coordenadas**
   - Click derecho en tu ubicación exacta
   - Click en las coordenadas (ejemplo: 25.5428, -103.4068)
   - Se copian automáticamente

4. **Actualizar en el código**
   - Abrir: `src/components/home/ContactSection.jsx`
   - Buscar: `const mapCenter = {`
   - Reemplazar los valores:
   ```javascript
   const mapCenter = {
     lat: 25.XXXXX,    // Tu latitud
     lng: -103.XXXXX   // Tu longitud
   }
   ```

#### Paso 4: Actualizar información de contacto (3 minutos)

En el archivo `src/components/home/ContactSection.jsx`, actualiza:

1. **Dirección completa** (línea ~50):
   ```javascript
   <p className="text-gray-600">
     Tu calle y número<br />
     Tu colonia<br />
     Torreón, Coahuila, México<br />
     C.P. XXXXX
   </p>
   ```

2. **Teléfono** (línea ~65) - ya está: `(871) 576-6792`

3. **Email** (línea ~95):
   ```javascript
   contacto@ortomediq.com  // o tu email real
   ```

4. **Horarios** (línea ~105):
   ```javascript
   Lunes a Viernes: 9:00 AM - 7:00 PM
   Sábados: 9:00 AM - 3:00 PM
   Domingos: Cerrado
   ```

#### Paso 5: Probar (1 minuto)

1. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

2. **Abrir en navegador**
   - 🔗 http://localhost:5173

3. **Verificar**
   - ✅ Botón de WhatsApp flotante (esquina inferior derecha)
   - ✅ Mapa de Google Maps en sección de contacto
   - ✅ Todos los datos de contacto correctos

---

## 🎯 Resultado Esperado

Una vez completados todos los pasos:

### WhatsApp
- ✅ Botón flotante verde en esquina inferior derecha
- ✅ Al hacer click, abre WhatsApp con mensaje predeterminado
- ✅ Animación de pulso para llamar la atención
- ✅ Tooltip informativo al pasar el mouse

### Google Maps
- ✅ Mapa interactivo mostrando tu ubicación
- ✅ Marcador en la ubicación exacta
- ✅ Botón "Ver en Google Maps"
- ✅ Controles de zoom y pantalla completa

### Información de Contacto
- ✅ Dirección completa y actualizada
- ✅ Teléfono con enlace para llamar
- ✅ WhatsApp con enlace funcional
- ✅ Email con enlace mailto
- ✅ Horarios de atención

---

## 🆘 Problemas Comunes

### El mapa no se carga (muestra un placeholder gris)
**Causa**: No hay API Key configurada
**Solución**: 
1. Verifica que el archivo `.env` existe
2. Verifica que la variable es: `VITE_GOOGLE_MAPS_API_KEY=tu_key`
3. Reinicia el servidor: `npm run dev`

### Error: "This page can't load Google Maps correctly"
**Causa**: API Key inválida o Maps JavaScript API no habilitada
**Solución**:
1. Verifica que copiaste bien la API Key
2. Ve a Google Cloud Console y verifica que Maps JavaScript API esté habilitada
3. Verifica que no haya espacios extra en el `.env`

### El marcador está en el lugar equivocado
**Causa**: Coordenadas incorrectas
**Solución**: Obtén las coordenadas correctas desde Google Maps

### El botón de WhatsApp no abre la conversación
**Causa**: Número mal formateado
**Solución**: El número debe estar en formato internacional sin espacios ni símbolos: `528715766792`

---

## 📚 Documentación Adicional

- **Google Maps completo**: Ver archivo `GOOGLE-MAPS-CONFIG.md`
- **Estructura del Home**: Ver archivo `ESTRUCTURA-HOME.md`
- **Estado del proyecto**: Ver archivo `ESTADO-PROYECTO.md`

---

## ⏱️ Tiempo Total de Configuración

- WhatsApp: ✅ YA HECHO (0 minutos)
- Google Maps API Key: ~5 minutos
- Archivo .env: ~1 minuto
- Coordenadas: ~2 minutos
- Información de contacto: ~3 minutos
- Pruebas: ~1 minuto

**TOTAL: ~12 minutos** ⚡

---

## ✉️ ¿Necesitas ayuda?

Si tienes problemas con la configuración:
1. Revisa los archivos de documentación
2. Verifica la consola del navegador (F12) para ver errores
3. Asegúrate de que todas las dependencias estén instaladas: `npm install`

¡Éxito con tu configuración! 🚀

