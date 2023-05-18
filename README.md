# **CaC - Curso React Comisión 23307 - TP Integrador Grupo 8 "El Chavo Del 8"**

&nbsp;

#### **Cómo generar una clave SSH con PuTTYGen**
_**IMPORTANTE:** Todos los pasos mencionados en esta sección deben ejecutarse **solamente UNA vez**._  
_Por favor lea atentamente cada paso **POR COMPLETO** antes de llevarlo a cabo._

&nbsp;

1. Desde la consola de Windows, crear un directorio `.ssh` dentro de la carpeta del usuario:
```console
mkdir %USERPROFILE%\.ssh
```

2. Ejecutar PuTTYGen (la versión de 64 bits puede descargarse [aquí](https://the.earth.li/~sgtatham/putty/latest/w64/puttygen.exe)).
3. Generar una clave haciendo click en el botón "Generate" y siguiendo las instrucciones.
    * **NOTA:** Se recomienda **_NO_** setear el passphrase, porque de lo contrario este será requerido en cada operación contra el servidor remoto (ej. `git pull`, `git push`).
4. Una vez generada la clave, hacer click en el botón "Save Private key" y guardarla en la carpeta `.ssh` creada en el paso 1 con el nombre `id_rsa.ppk`. Si no se especificó passsphrase, se mostrará un mensaje de advertencia; ignorarlo clickeando en "Yes".
5. A continuación, debe exportarse la clave privada a formato OpenSSH para que pueda ser usada por Git. Para ello, abrir el menú "Conversions" y seleccionar la opción "Export OpenSSH key". Nuevamente se mostrará el mensaje de advertencia; ignorarlo y guardar la clave en la carpeta `.ssh` como `id_rsa` (sin extensión de archivo).
6. Copiar el texto que aparece en el recuadro "Public key for pasting into authorized_keys file" (click derecho > Seleccionar todo, click derecho > Copiar), y guardarlo en la carpeta `.ssh` como `id_rsa.pub`.
7. Por último, hay que agregar la clave pública a GitLab. Para ello, [loguearse en el sitio](https://rx173.cajval.sba.com.ar/users/sign_in) y luego ir a la URL <https://rx173.cajval.sba.com.ar/profile/keys>. En el recuadro "Key" copiar el contenido del archivo `id_rsa.pub` generado en el paso anterior y hacer click en el botón "Add key".

&nbsp;

#### **Cómo configurar los datos del usuario**
_**IMPORTANTE:** Todos los pasos mencionados en esta sección deben ejecutarse **solamente UNA vez**._  
_Las siguientes instrucciones deben ejecutarse desde la línea de comandos, usando el programa Git Bash._

```bash
git config --global user.name 'Nombre Apellido'
git config --global user.email 'email@dominio.sba.com.ar'
```

&nbsp;

#### **Cómo configurar el repositorio Git**
_**IMPORTANTE:** Todos los pasos mencionados en esta sección deben ejecutarse **solamente la PRIMERA vez** que se vaya a usar **ESTE** repositorio._  
_Las siguientes instrucciones deben ejecutarse desde la línea de comandos, usando el programa Git Bash._

En la carpeta que se desea que tenga el repositorio (es decir, que tenga el repositorio como subcarpeta), ejecutar:

* Con SsH:
```bash
git clone git@github.com:jotadeaa/react-23307-elchavodel8.git
cd react-23307-elchavodel8
git checkout main
```

* Con HTTPS:
```bash
git clone https://github.com/jotadeaa/react-23307-elchavodel8.git
cd react-23307-elchavodel8
git checkout main
```
