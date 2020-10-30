import axios from 'axios';

export default class PasswordServices {

    // GET     /passwords         Solicita todas las entradas.
    // GET     /passwords/:id     Solicita una entrada por id.
    // POST    /passwords         Crea una entrada.
    // PUT     /passwords/:id     Actualiza una entrada.
    // DELETE  /passwords/:id     Elimina una entrada.

    getAllPassword() {
        return axios.get(`http://localhost:3000/passwords`).then(response => response).catch(error => { return error });
    }

    getPasswordById(idPassword) {
        return axios.get(`http://localhost:3000/passwords/${idPassword}`).then(response => response).catch(error => { return error });
    }

    save(data) {
        return axios.post(`http://localhost:3000/passwords`, data, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
        }).then(response => response).catch(error => { return error });
    }

    update(idPassword, data) {
        return axios.put(`http://localhost:3000/passwords/${idPassword}`, data, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
        }).then(response => response).catch(error => { return error });
    }

    delete(idPassword) {
        return axios.delete(`http://localhost:3000/passwords/${idPassword}`).then(response => response).catch(error => { return error });
    }




    // guardarAbonosCobros(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
    //     return axios.post(`CobradoresGuardarCobros?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     }).then(response => response);
    // }

    // guardarAbonosPrestamos(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
    //     return axios.post(`CobradoresGuardarPrestamos?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     }).then(response => response);
    // }

    // actualizarValorPrestamos(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
    //     return axios.post(`CobradoresActualizarPrestamos?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     }).then(response => response);
    // }


}