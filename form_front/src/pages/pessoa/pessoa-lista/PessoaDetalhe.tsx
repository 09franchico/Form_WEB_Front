import { LayoutPage } from "../../../shared/layout/LayoutPage"
import { useEffect, useRef } from "react";
import { useFormik, FormikErrors } from 'formik';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from "primereact/inputmask";
import { useNavigate, useParams } from "react-router";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { PessoasService } from "../../../shared/service/api/pessoa/PessoaService";
import * as Yup from "yup";
import moment from "moment";
import { InputNumber } from 'primereact/inputnumber';
import { useState } from "react";

interface FormValues {
    id?: number
    nome: string;
    dataNascimento: string
    imagem: string,
    endereco: {
        bairro: string,
        rua: string,
        numero: number,
        cep: string
    }
}

export const PessoaDetalhe = () => {
    const toast = useRef<any>(null);
    const navigate = useNavigate()
    const [loadingButton, setLoadingButton] = useState(false);
    const { id = 'nova' } = useParams<'id'>();

    //Show Sucesso ao submeter o formulario 1 - Create , 2 - Update 
    const show = (opcao: number) => {
        if (opcao == 1) {
            toast.current.show({
                severity: 'success',
                summary: 'Pessoa criada com sucesso'
            });
        }
        if (opcao == 2) {
            toast.current.show({
                severity: 'success',
                summary: 'Update realizado com sucesso'
            });
        }

        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    //Verifca se é criacao ou update de pessoa 
    useEffect(() => {
        if (id !== 'nova') {
            PessoasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoa');
                    } else {
                        console.log(result.data)
                        formik.setValues(result.data)
                    }
                });
        } else {
            formik.setValues({
                nome: '',
                dataNascimento: '',
                imagem: '',
                endereco: {
                    bairro: '',
                    rua: '',
                    numero: 0,
                    cep: ''
                }
            })

        }
    }, [id]);


    const SignupSchema = Yup.object().shape({
        nome: Yup.string()
            .min(3, 'Minimo 3 caracteres')
            .required('Nome é obrigatorio'),
        dataNascimento: Yup.string()
            .required('Data de nascimento obrigatorio'),
        endereco: Yup.object().shape({
            bairro: Yup.string().required("Bairro é obrigatorio"),
            rua: Yup.string().required("Rua é obrigatorio"),
            numero: Yup.number().required("Numero é obrigatorio"),
            cep: Yup.string().required("CEP é obrigatorio"),

        })


    });


    //Configuração Formik 
    const formik = useFormik<FormValues>({
        initialValues: {
            nome: '',
            dataNascimento: '',
            imagem: '',
            endereco: {
                bairro: '',
                rua: '',
                numero: 0,
                cep: '0'
            }
        },
        validationSchema: SignupSchema,
        onSubmit: (data: FormValues) => {
            setLoadingButton(true);
            //Salva pessoa
            if (id === "nova") {
                PessoasService
                    .create(data)
                    .then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            formik.resetForm();
                            data && show(1);
                            setLoadingButton(false);
                        }
                    });

            } else {
                //Update de pessoa
                setLoadingButton(true);
                PessoasService
                    .updateById(Number(id), data as any)
                    .then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            formik.resetForm();
                            data && show(2);
                            setLoadingButton(false);
                        }
                    });

            }
        }
    });


    //Confirmar cancel na pagina 
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmado', detail: 'Cancelado com sucesso', life: 1000 });

        setTimeout(() => {
            navigate("/");
        }, 2000);
    }
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejeitado', detail: 'Rejeitou com sucesso', life: 1000 });
    }
    const confirma = () => {
        confirmDialog({
            message: 'Tem certeza de que deseja concelar?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept,
            reject
        });
    };

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };


    return (
        <LayoutPage mostrarFerramenta={false}>

            <div className="card flex justify-content-center">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 ">
                    <div className="card-container flex  mt-6">
                        {/* Campo de input NOME */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <ConfirmDialog />
                                <InputText
                                    size={50}
                                    id="nome"
                                    name="nome"
                                    value={formik.values.nome}
                                    onChange={(e) => {
                                        formik.setFieldValue('nome', e.target.value);
                                    }}
                                />
                                <label htmlFor="input_value">Nome</label>
                            </span>
                            {formik.touched.nome && formik.errors.nome ? (
                                <small className="p-error">{formik.errors.nome}</small>
                            ) : null}
                        </span>

                        {/* Campo de input DATA DE NASCIMENTO */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <Calendar
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    dateFormat="dd/mm/yy"
                                    value={formik.values.dataNascimento ? moment(formik.values.dataNascimento).toDate() : null}
                                    onChange={(e) => formik.setFieldValue('dataNascimento', e.target.value)}
                                />
                                <label htmlFor="input_value">Data de Nascimento</label>
                            </span>
                            {formik.touched.dataNascimento && formik.errors.dataNascimento ? (
                                <small className="p-error">{formik.errors.dataNascimento}</small>
                            ) : null}
                        </span>
                    </div>
                    <FileUpload
                        mode="basic"
                        name="imagem"
                        url="/api/upload"
                        accept="image/*"
                        chooseLabel="Imagem"
                        maxFileSize={1000000}
                        onUpload={onUpload} />
                    <label htmlFor="text" className="my-3 ml-2">Informações de endereço</label>
                    {/* Campo de input CEP */}
                    <span className="m-1">
                        <span className="p-float-label">
                            <InputMask
                                id="cep"
                                name="cep"
                                value={formik.values.endereco.cep}
                                onChange={(e) => {
                                    formik.setFieldValue('endereco.cep', e.target.value);
                                }}
                                mask="99999-999"
                                placeholder="99999-999"
                            />
                            <label htmlFor="input_value">CEP</label>
                        </span>
                        {formik.touched.endereco?.cep && formik.errors.endereco?.cep ? (
                            <small className="p-error">{formik.errors.endereco?.cep}</small>
                        ) : null}
                    </span>

                    <div className="card-container flex">
                        {/* Campo de input Rua */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputText
                                    size={50}
                                    id="rua"
                                    name="rua"
                                    value={formik.values.endereco.rua}
                                    onChange={(e) => {
                                        formik.setFieldValue('endereco.rua', e.target.value);
                                    }}
                                />
                                <label htmlFor="input_value">Rua</label>
                            </span>
                            {formik.touched.endereco?.rua && formik.errors.endereco?.rua ? (
                                <small className="p-error">{formik.errors.endereco?.rua}</small>
                            ) : null}
                        </span>

                        {/* Campo de input Bairro */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputText
                                    id="bairro"
                                    name="bairro"
                                    value={formik.values.endereco.bairro}
                                    onChange={(e) => {
                                        formik.setFieldValue('endereco.bairro', e.target.value);
                                    }}
                                />
                                <label htmlFor="input_value">Bairro</label>
                            </span>
                            {formik.touched.endereco?.bairro && formik.errors.endereco?.bairro ? (
                                <small className="p-error">{formik.errors.endereco?.bairro}</small>
                            ) : null}
                        </span>

                        {/* Campo de input Numero */}
                        <span className="m-1">
                            <span className="p-float-label">
                                <InputNumber
                                    id="numero"
                                    name="numero"
                                    value={formik.values.endereco.numero}
                                    onValueChange={(e) => {
                                        const value = e.target.value ?? '';
                                        formik.setFieldValue('endereco.numero', value);
                                    }}
                                    mode="decimal"
                                    showButtons
                                     />
                                <label htmlFor="input_value">Numero</label>
                            </span>
                            {formik.touched.endereco?.numero && formik.errors.endereco?.numero ? (
                                <small className="p-error">{formik.errors.endereco?.numero}</small>
                            ) : null}

                        </span>
                    </div>

                    {/* Botão para submeter o formulario */}
                    <div className="card-container flex justify-content-end">
                        <Button type="button" label="Cancelar" severity="danger" outlined onClick={confirma} />
                        <Button loading={loadingButton} className="ml-3" type="submit" label="Salvar" />
                    </div>
                </form>
            </div>

        </LayoutPage>
    )
}