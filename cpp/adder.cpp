#include <emscripten.h>
using namespace std;
#include <iostream>
#include <vector> 
extern "C"
{
class BTreeNode{
  int t, n;
  bool leaf;
  vector<int> keys;
  vector<BTreeNode*> children;
  public:
    BTreeNode(int _t, bool _leaf);
    void traverse();
    void splitChild(int i, BTreeNode* y);
    void insertNonFull(int k);  

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
    void insert(int k);
    bool search(int k);
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
      if(leaf == false)
        children[i]->traverse();
      cout << " " << keys[i];
    }
  if(leaf == false)
    children[i]->traverse();
}

void BTreeNode::insertNonFull(int k)
{
  int i = n-1;
  if(leaf == true)
  {
    while(i >= 0 && keys[i] > k)
      {
        keys[i+1] = keys[i];
        i--;
      }
    keys[i+1] = k;
    n = n+1;
  }
  else{
    while(i >= 0 && keys[i] > k)
      i--;
    if(children[i+1]->n == 2*t-1)
    {
      splitChild(i+1, children[i+1]);
      if(keys[i+1] < k)
        i++;
    }
    children[i+1]->insertNonFull(k);
  }
}

void BTreeNode::splitChild(int i, BTreeNode* y)
{
  BTreeNode* z = new BTreeNode(y->t, y->leaf);
  z->n = t-1; 
  for(int j = 0; j < t-1; j++)
    z->keys[j] = y->keys[j+t];
  if(y->leaf == false)
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

void Btree::insert(int k)
{
  if(root == NULL)
  {
    root = new BTreeNode(t, true);
    root->keys[0] = k;
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
      if(s->keys[0] < k)
        i++;
      s->children[i]->insertNonFull(k);
      root = s;
    }
    else
    {
      root->insertNonFull(k);
    }
  }
}

bool Btree::search(int k){
  if(root == NULL)
  {
    cout << "Tree is empty" << endl;
    return false;
  }
  BTreeNode* curr = root;
  while(curr != NULL)
    {
      int i = 0;
      while(i < curr->n && k > curr->keys[i])
        i++;
      if(i < curr->n && k == curr->keys[i])
      {
        return true;
      }
      curr = curr->children[i];
      
    }
  return false;
}

Btree t(4);

EMSCRIPTEN_KEEPALIVE
bool create() {

  t.insert(70);
  t.insert(50);
  t.insert(30);
  t.insert(40);
  t.insert(20);
  t.insert(80);
  t.insert(25);
  t.insert(90);
  t.insert(75);
  t.insert(10);
  t.insert(15);


  return t.search(70);
  
}
}