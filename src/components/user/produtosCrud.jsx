import React from 'react'
import Main from '../template/main'

import axios from 'axios'

const headerProps = {
    title: 'Lista de Compras',
}

const baseUrl = 'http://localhost:3001/lista'
const initState= {
    lista: { produto:'',
            data: ''},
    list: []
}

export default class UserCrud extends React.Component{

    state = { ...initState }

    /**Chamada quando o elemento for exibido na tela */
    componentWillMount() {
        axios.get(baseUrl,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ list: resp.data })/**salvamos dentro da lista as requisições */
        })        
    }


    /*Limpar formulario */
    clear() {
        this.setState({ lista: initState.lista })
    }
    save() {
        const lista = this.state.lista        
        const method = lista.id ? 'put' : 'post'
        const url = lista.id ? `${baseUrl}/${lista.id}` : baseUrl
        var config = {
            headers: {crossdomain: true}
        };
        axios[method](url,lista,config)
        .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ lista: initState.lista, list })  
            console.log(resp.data)         
        })
        .catch(error => {
            console.log(error)
        })

    }
    getUpdatedList(lista){       
        const list = this.state.list.filter(u => u.id !== lista.id) /**removendo o usuario da lista */
        list.unshift(lista) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const lista = { ...this.state.lista }
        lista[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ lista })
    }
    renderForm(){
        /**jsx que ira renderizar o formulário */
        return (
            <div className="form was-validated">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Produto</label>
                            <input type="text" className="form-control" 
                                name="produto" 
                                value={this.state.lista.produto}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o produto.."
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Data</label>
                            <input type="data" className="form-control" 
                                name="data" 
                                value={new Date().toLocaleString()}
                                onMouseOver={e => this.updatefield(e)}
                                disabled
                                />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content end">
                        <button className="btn btn-primary"
                        if 
                        onClick={ e => this.save(e)}>Salvar</button>
                    </div>
                </div>

            </div>
        );
    }

    /**edição */
    load(lista){
        this.setState({ lista })/**atualiza o estado da aplicação. */
    }
    remove(lista){
        axios.delete(`${baseUrl}/${lista.id}`)
        .then(resp => {
            const list = this.state.list.filter(u => u !== lista)
            this.setState({ list })
        })
    }

    /**list listas */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderows()}
                </tbody>            
            </table>
        );
    }
    renderows(){
        /**mapeando produtos que estão no estado do objeto */
        return this.state.list.map((lista,index) => {
            return (                
                <tr key={index}>
                    <td>{lista.produto}</td>
                    <td>{lista.data}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(lista)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(lista)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }

    render(){        
        return(            
            <Main {...headerProps}>
                
                {this.renderForm()}
                {this.rendertable()}

            </Main>
        );
    }
}