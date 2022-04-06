import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import ProdutosCrud from '../components/user/produtosCrud'

/*Mapeamento dos links aos componentes*/
export default props =>
    <Switch>
        <Route exact path="/" component={ProdutosCrud} />
        <Redirect from="*" to="/" />
    </Switch>


