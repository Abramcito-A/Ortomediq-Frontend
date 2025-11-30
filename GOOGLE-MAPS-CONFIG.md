# 📍 Configuración de Google Maps para Ortomediq

## 🚀 Guía Rápida de Configuración

### Paso 1: Obtener API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca y habilita **"Maps JavaScript API"**
5. Ve a **APIs & Services** > **Credentials**
6. Click en **"Create Credentials"** > **"API Key"**
7. Copia tu API Key

### Paso 2: Configurar el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto (si no existe):

```env
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

⚠️ **IMPORTANTE**: Nunca subas el archivo `.env` a Git (ya está en `.gitignore`)

### Paso 3: Obtener Coordenadas de tu Negocio

#### Opción 1: Usando Google Maps
1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu negocio: "Ortomediq Torreón"
3. Click derecho en la ubicación exacta
4. Click en las coordenadas que aparecen (ejemplo: 25.5428, -103.4068)
5. Las coordenadas se copian automáticamente

#### Opción 2: Usando la URL de Google Maps
1. Busca tu negocio en Google Maps
2. Copia la URL (ejemplo: `https://www.google.com/maps/place/@25.5428,-103.4068,17z`)
3. Los números después de `@` son la latitud y longitud

### Paso 4: Actualizar Coordenadas en el Código

Edita `src/components/home/ContactSection.jsx`:

```javascript
const mapCenter = {
  lat: 25.5428,    // ⬅️ Reemplaza con tu latitud
  lng: -103.4068   // ⬅️ Reemplaza con tu longitud
}
```

### Paso 5: Actualizar Dirección

En el mismo archivo, actualiza la dirección real:

```javascript
<p className="text-gray-600">
  Av. Principal #123<br />      {/* ⬅️ Dirección real */}
  Torreón, Coahuila, México
</p>
```

## 🔒 Seguridad: Restringir API Key (IMPORTANTE)

Para evitar uso no autorizado de tu API Key:

1. En Google Cloud Console, ve a **Credentials**
2. Click en tu API Key
3. En **"Application restrictions"**:
   - Selecciona **"HTTP referrers (web sites)"**
   - Agrega tus dominios:
     - `http://localhost:5173/*` (desarrollo)
     - `https://tudominio.com/*` (producción)

4. En **"API restrictions"**:
   - Selecciona **"Restrict key"**
   - Marca solo: **"Maps JavaScript API"**

5. Guarda los cambios

## 💰 Costos

- Google Maps ofrece **$200 USD en créditos gratuitos mensuales**
- Para un sitio web con tráfico normal, esto es más que suficiente
- Revisa el [pricing](https://cloud.google.com/maps-platform/pricing) para más detalles

## 🧪 Probar la Configuración

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a la sección de contacto en tu página
3. Deberías ver el mapa con un marcador en tu ubicación

## ⚠️ Solución de Problemas

### Error: "This page can't load Google Maps correctly"
- **Causa**: API Key inválida o no configurada
- **Solución**: Verifica que la API Key esté en `.env` y sea correcta

### El mapa no se carga
- **Causa**: Maps JavaScript API no habilitada
- **Solución**: Ve a Google Cloud Console y habilita la API

### Placeholder gris con "Configura tu API Key"
- **Causa**: No hay API Key en `.env`
- **Solución**: Crea el archivo `.env` con la variable `VITE_GOOGLE_MAPS_API_KEY`

### El marcador está en el lugar equivocado
- **Causa**: Coordenadas incorrectas
- **Solución**: Actualiza `mapCenter` en `ContactSection.jsx`

## 📝 Ejemplo Completo

Tu archivo `.env` debe verse así:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC4Xxxxxxxxxxxxxxxxxxxxxxxxx
```

Y tu `ContactSection.jsx`:

```javascript
const mapCenter = {
  lat: 25.5428,    // Tu latitud real
  lng: -103.4068   // Tu longitud real
}
```

## 🎯 Resultado Final

Una vez configurado correctamente, tendrás:
- ✅ Mapa interactivo mostrando tu ubicación
- ✅ Marcador en la ubicación exacta de tu negocio
- ✅ Botón para abrir en Google Maps
- ✅ Controles de zoom y pantalla completa
- ✅ Diseño responsive

## 📚 Recursos Adicionales

- [Documentación oficial de Google Maps](https://developers.google.com/maps/documentation/javascript)
- [React Google Maps API](https://react-google-maps-api-docs.netlify.app/)
- [Pricing Calculator](https://mapsplatformtransition.withgoogle.com/calculator)

---

**Nota**: Si necesitas ayuda adicional, consulta la documentación oficial o contacta al equipo de desarrollo.

