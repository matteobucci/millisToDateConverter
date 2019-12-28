# MillisToDateConverter

A Firefox extension that allow to show formatted dates instead of timestamp in the Firebase console

# How it works
Once the extension is enabled, every UNIX epoch expressed in milliseconds is automatically displayed as a simple date.
This doesn't change the original value holded by the field but it's just easier to read and to compare when developing with milliseconds.
The extension also listen to new elements in the DOM and converts them instantly, but when an element is changed (when editing a field) you can also trigger the refresh manually.

# How to install it
### Load as a temporary extension
- Go to <about:debugging#/runtime/this-firefox>
- Press on _Load temporary add-on_
- Select a file in the extension folder. Firefox should detect the extension and install easily.
[More informations about loading an extension]

### Publish the extension
 [Here the official documentation]
 
 

   [More informations about loading an extension]: <https://blog.mozilla.org/addons/2015/12/23/loading-temporary-add-ons/>
   [Here the official documentation]: <https://extensionworkshop.com/documentation/publish/submitting-an-add-on/>
