#include <emscripten.h>
using namespace std;
#include <iostream>
#include <sstream>
#include <chrono> 
#include <vector> 
#include <cstring> // Para strcpy y strlen
extern "C"
{

class Ciudadano {
public:
    int dni;
    string nombre;
    string apellido;

    Ciudadano(int _dni, const string& _nombre, const string& _apellido) : dni(_dni), nombre(_nombre), apellido(_apellido) {}
};

class BTreeNode{
    int t, n;
    bool leaf;
    vector<Ciudadano*> keys;
    vector<BTreeNode*> children;
public:
    BTreeNode(int _t, bool _leaf);
    void traverse();
    void splitChild(int i, BTreeNode* y);
    void insertNonFull(Ciudadano* citizen);  
    Ciudadano* search(int dni);
    friend class Btree;
};

class Btree{
    BTreeNode* root;
    int t;
public:
    Btree(int _t)
    {
        root = NULL;
        t = _t;
    }
    void traverse(){
        if(root != NULL)
            root->traverse();
    }
    void insert(Ciudadano* citizen);
    Ciudadano* search(int dni);
};

BTreeNode::BTreeNode(int _t, bool _leaf){
    t = _t;
    leaf = _leaf;
    keys.resize(2*t-1);
    children.resize(2*t);
}

void BTreeNode::traverse(){
    int i;
    for(i = 0; i < n; i++)
    {
        if(!leaf)
            children[i]->traverse();
        cout << " " << keys[i]->dni;
    }
    if(!leaf)
        children[i]->traverse();
}

void BTreeNode::insertNonFull(Ciudadano* citizen)
{
    int i = n-1;
    if(leaf)
    {
        while(i >= 0 && keys[i]->dni > citizen->dni)
        {
            keys[i+1] = keys[i];
            i--;
        }
        keys[i+1] = citizen;
        n = n+1;
    }
    else{
        while(i >= 0 && keys[i]->dni > citizen->dni)
            i--;
        if(children[i+1]->n == 2*t-1)
        {
            splitChild(i+1, children[i+1]);
            if(keys[i+1]->dni < citizen->dni)
                i++;
        }
        children[i+1]->insertNonFull(citizen);
    }
}

void BTreeNode::splitChild(int i, BTreeNode* y)
{
    BTreeNode* z = new BTreeNode(y->t, y->leaf);
    z->n = t-1; 
    for(int j = 0; j < t-1; j++)
        z->keys[j] = y->keys[j+t];
    if(!y->leaf)
    {
        for(int j = 0; j < t; j++)
            z->children[j] = y->children[j+t];
    }
    y->n = t-1;
    for(int j = n; j >= i+1; j--)
        children[j+1] = children[j];
    children[i+1] = z;
    for(int j = n-1; j >= i; j--)
        keys[j+1] = keys[j];
    keys[i] = y->keys[t-1];
    n = n+1;
}

void Btree::insert(Ciudadano* citizen)
{
    if(root == NULL)
    {
        root = new BTreeNode(t, true);
        root->keys[0] = citizen;
        root->n = 1;
    }
    else
    {
        if(root->n == 2*t-1)
        {
            BTreeNode* s = new BTreeNode(t, false);
            s->children[0] = root;
            s->splitChild(0, root);
            int i = 0;
            if(s->keys[0]->dni < citizen->dni)
                i++;
            s->children[i]->insertNonFull(citizen);
            root = s;
        }
        else
        {
            root->insertNonFull(citizen);
        }
    }
}

Ciudadano* BTreeNode::search(int dni){
    int i = 0;
    while(i < n && dni > keys[i]->dni)
        i++;
    if(i < n && dni == keys[i]->dni)
        return keys[i];
    if(leaf)
        return nullptr;
    return children[i]->search(dni);
}

Ciudadano* Btree::search(int dni){
    if(root == NULL)
    {
        cout << "Tree is empty" << endl;
        return nullptr;
    }
    return root->search(dni);
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
//EMSCRIPTEN_KEEPALIVE
//long long pruebaAndres(int n){
//    BTree arbol(6); // Crear un BTree con un orden de 6
//    
//    auto start = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de inicio
//
//    
//    for(int i=0;i<n;i++)
//    {
//        arbol.insertar(10);
//    }
//    
//    auto stop = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de finalización
//    auto duration = duration_cast<std::chrono::milliseconds>(stop - start); // Calcular la duración en milisegundos
//
//    return duration.count();
//}

Btree t(15);


EMSCRIPTEN_KEEPALIVE
long long pruebaCreacion(int numElements){

    auto start = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de inicio


    for(int i = 0; i < numElements; i++){
        int dni = i;
        string nombre = "Julian #" + std::to_string(i);
        string apellido = "Quispe";

        t.insert(new Ciudadano(dni, nombre, apellido));
    }

    auto stop = std::chrono::high_resolution_clock::now(); // Obtener el tiempo de finalización
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start); // Calcular la duración en milisegundos

    return duration.count();
    // Traverse the tree
    //cout << "El recorrido del arbol es: " << endl;
    //t.traverse();
    //cout << endl;

}

EMSCRIPTEN_KEEPALIVE
char* pruebaBusqueda(int dniToSearch) {
    // Search by DNI
    char* result;
    Ciudadano* foundCitizen = t.search(dniToSearch);
    if (foundCitizen != nullptr) {
        // Construir la cadena resultante
        string tempResult = "Ciudadano encontrado - Nombre: " + foundCitizen->nombre + ", Apellido: " + foundCitizen->apellido;
        result = new char[tempResult.length() + 1]; // +1 para el carácter nulo
        strcpy(result, tempResult.c_str()); // Copiar la cadena de string a char*
    } else {
        result = new char[18]; // "Ciudadano no encontrado" tiene 18 caracteres
        strcpy(result, "Ciudadano no encontrado");
    }

    // Cleanup memory
    delete foundCitizen;
    return result;
}

}