#include <emscripten.h>
using namespace std;
#include <iostream>
#include <sstream>
#include <chrono> 
#include <vector> 
extern "C"
{
  class NodoBTree {
public:
    bool esHoja;
    vector<int> keys;
    vector<NodoBTree*> hijos;
    NodoBTree(bool _esHoja);
};

// Constructor de la clase NodoBTree
NodoBTree::NodoBTree(bool _esHoja) {
    esHoja = _esHoja;
}

// Definición de la clase BTree
class BTree {
public:
    NodoBTree* raiz;
    int orden;
    BTree(int _orden);
    void insertar(int llave);
    void dividirHijo(NodoBTree* padre, int indiceHijo, NodoBTree* hijo);
    void insertarNoLleno(NodoBTree* nodo, int llave);
};

// Constructor de la clase BTree
BTree::BTree(int _orden) {
    raiz = nullptr;
    orden = _orden;
}

// Función para insertar una llave en el BTree
void BTree::insertar(int llave) {
    if (raiz == nullptr) {
        raiz = new NodoBTree(true);
        raiz->keys.push_back(llave);
    } else {
        if (raiz->keys.size() == (orden - 1)) { // Si la raíz está llena
            NodoBTree* nuevaRaiz = new NodoBTree(false); // Crear una nueva raíz
            nuevaRaiz->hijos.push_back(raiz); // La raíz actual se convierte en hijo de la nueva raíz
            dividirHijo(nuevaRaiz, 0, raiz); // Dividir el hijo (antigua raíz)
            raiz = nuevaRaiz; // Establecer la nueva raíz
        }
        insertarNoLleno(raiz, llave); // Llamar a la función auxiliar para insertar en un nodo no lleno
    }
}

// Función auxiliar para insertar en un nodo que no está lleno
void BTree::insertarNoLleno(NodoBTree* nodo, int llave) {
    int indice = nodo->keys.size() - 1; // Obtener el índice de la última llave
    if (nodo->esHoja) { // Si el nodo es una hoja
        // Insertar la llave en la posición adecuada para mantener el orden
        while (indice >= 0 && llave < nodo->keys[indice]) {
            nodo->keys[indice + 1] = nodo->keys[indice];
            indice--;
        }
        nodo->keys[indice + 1] = llave;
    } else { // Si el nodo es interno
        while (indice >= 0 && llave < nodo->keys[indice]) {
            indice--;
        }
        indice++; // Obtener el índice del hijo apropiado
        if (nodo->hijos[indice]->keys.size() == (orden - 1)) { // Si el hijo está lleno
            dividirHijo(nodo, indice, nodo->hijos[indice]); // Dividir el hijo
            if (llave > nodo->keys[indice]) {
                indice++;
            }
        }
        insertarNoLleno(nodo->hijos[indice], llave); // Insertar en el hijo adecuado
    }
}

// Función para dividir un hijo de un nodo dado
void BTree::dividirHijo(NodoBTree* padre, int indiceHijo, NodoBTree* hijo) {
    NodoBTree* nuevoHijo = new NodoBTree(hijo->esHoja);
    nuevoHijo->keys.assign(hijo->keys.begin() + (orden / 2) + 1, hijo->keys.end()); // Mover la mitad superior de las llaves al nuevo hijo
    hijo->keys.resize(orden / 2); // Redimensionar el hijo original
    if (!hijo->esHoja) { // Si el hijo no es una hoja, también debemos mover los punteros
        nuevoHijo->hijos.assign(hijo->hijos.begin() + (orden / 2) + 1, hijo->hijos.end());
        hijo->hijos.resize(orden / 2 + 1);
    }
    padre->keys.insert(padre->keys.begin() + indiceHijo, hijo->keys[orden / 2]); // Insertar la llave promovida en el padre
    padre->hijos.insert(padre->hijos.begin() + indiceHijo + 1, nuevoHijo); // Insertar el nuevo hijo en el padre
}


//class BTreeNode{
//  int t, n;
//  bool leaf;
//  vector<int> keys;
//  vector<BTreeNode*> children;
//  public:
//    BTreeNode(int _t, bool _leaf);
//    void traverse(stringstream &result);
//    void splitChild(int i, BTreeNode* y);
//    void insertNonFull(int k);  
//
//    friend class Btree;
//};

//class Btree{
//  BTreeNode* root;
//  int t;
//  public:
//    Btree(int _t)
//    {
//      root = NULL;
//      t = _t;
//    }
//void traverse(char* result, size_t size) {
//    if (root != NULL) {
//        stringstream ss;
//        root->traverse(ss);
//        string str = ss.str();
//        size_t len = str.copy(result, size - 1);
//        result[len] = '\0'; // Agregar el terminador nulo
//    } else {
//        result[0] = '\0'; // Si el árbol está vacío, el resultado es una cadena vacía
//    }
//}
//    void insert(int k);
//    bool search(int k);
//};


//void BTreeNode::traverse(stringstream &ss) {
//    int i;
//    for (i = 0; i < n; i++) {
//        if (!leaf)
//            children[i]->traverse(ss);
//        ss << " " << keys[i];
//    }
//    if (!leaf)
//        children[i]->traverse(ss);
//}

//char *traverseTree(Btree *t) {
//    const size_t bufferSize = 1024; // Tamaño máximo del buffer
//    char *buffer = new char[bufferSize];
//    t->traverse(buffer, bufferSize);
//    return buffer;
//}

//EMSCRIPTEN_KEEPALIVE
//char *traverseTreeF() {
//    char *result = traverseTree(t); // Obtener la cadena desde la función traverseTree
//    size_t len = strlen(result); // Obtener la longitud de la cadena (sin incluir el carácter nulo)
//
//    // Asegurarse de que la cadena esté correctamente terminada con '\0'
//    char *resultWithNull = new char[len + 1];
//    memcpy(resultWithNull, result, len);
//    resultWithNull[len] = '\0';
//
//    delete[] result; // Liberar la memoria de la cadena original
//
//    return resultWithNull; // Devolver la cadena terminada con '\0'
//}
EMSCRIPTEN_KEEPALIVE
long long pruebaAndres(int n){
    BTree arbol(6); // Crear un BTree con un orden de 6
    
    auto start = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de inicio

    
    for(int i=0;i<n;i++)
    {
        arbol.insertar(10);
    }
    
    auto stop = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de finalización
    auto duration = duration_cast<std::chrono::milliseconds>(stop - start); // Calcular la duración en milisegundos

    return duration.count();
}

}