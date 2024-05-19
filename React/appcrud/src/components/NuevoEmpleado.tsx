import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { appsettings } from "../settings/appsettings"

const initialEmpleado = {
    nombre:"",
    correo:"",
    sueldo:0,
}

export function NuevoEmpleado(){

    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado)
    const navigate = useNavigate()

    const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setEmpleado({...empleado, [inputName]:inputValue})
    }

    const guardar = async ()=> {
        const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(empleado)
        })
        if(response.ok){
            navigate("/")
        }else{
            Swal.fire({
                title: "Error",
                text: "No se puedo guardar el empleado",
                icon: "warning"
            });
        }

    }

    const volver = ()=> {
        navigate("/")
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Nuevo Empleado</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre}></Input>
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="text" name="correo" onChange={inputChangeValue} value={empleado.correo}></Input>
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label>Sueldo</Label>
                            <Input type="number" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo}></Input>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}> Guardar </Button>
                    <Button color="secondary" className="me-4" onClick={volver}> Volver </Button>
                </Col>
            </Row>
        </Container>
    )
}