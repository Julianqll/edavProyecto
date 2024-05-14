MODULE_NAME=cpp/adder
OUTPUT_JS=src/wasm/adder_wasm.js
OUTPUT_WASM=src/wasm/adder_wasm.wasm 

emcc ${MODULE_NAME}.cpp \
    -o ${OUTPUT_JS} \
    -s EXPORT_ES6=1 \
    -s 'EXPORT_NAME="$MODULE_NAME"' \
    -s 'ENVIRONMENT="web"' \
    -s 'EXPORTED_RUNTIME_METHODS=["UTF8ToString"]'\
    -s ALLOW_MEMORY_GROWTH \
    -s MAXIMUM_MEMORY=4294967296 
