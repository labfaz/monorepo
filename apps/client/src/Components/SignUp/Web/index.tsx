import React, { FC, useRef, useState } from 'react'
import { Form, Formik, FormikConfig, FormikValues, useFormikContext } from 'formik'
import {
  FaRegCheckCircle,
  FaYoutubeSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
  FaLinkedin,
} from 'react-icons/fa'
import * as yup from 'yup'

import {
  facebookUserRegex,
  instagramUserRegex,
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex'

import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import { Step6 } from './Step6'
import { Step7 } from './Step7'
import { Step8 } from './Step8'
import { Step9 } from './Step9'

import {
  Container,
  FormTitle,
  FormContainer,
  NextButton,
  BackButton,
  RightSession,
  SessionContainer,
  ConfirmEmailModal,
} from './style'
import { SignUp } from 'Api/SignUp'
import { ErrorObject } from 'Api'

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined
}

export const Web: FC<ButtonProps> = ({ buttonType }) => {
  return (
    <Container>
      <FormikStepper
        initialValues={{
          email: '',
          password: '',
          confirm_password: '',
          other_idiom: '',
          use_terms: '',
          profilePicture: '',
          curriculum: '',
          Other_TechnicalArea: '',
          artist: {
            name: '',
            social_name: '',
            artistic_name: '',
            show_name: '',
            gender: '',
            sexual_orientation: '',
            gender_identity: '',
            other_gender: '',
            cpf: '',
            birthday: '',
            rg: '',
            expedition_department: '',
            is_trans: '',
            race: '',
            address: {
              city: '',
              cep: '',
              neighbourhood: '',
              number: '',
              complement: '',
              residency: 'df',
              state: 'Distrito Federal'
            },
            contact: {
              whatsapp: '',
              twitter: '',
              facebook: '',
              instagram: '',
              linkedin: '',
              tiktok: '',
              youtube: '',
            },
            technical: {
              formation: '',
              is_drt: '',
              is_ceac: '',
              is_cnpj: '',
              drt: '',
              ceac: '',
              cnpj: '',
              name_enterprise: '',
              cnpj_type: '',
              profession: '',
              areas: {
                technical_formation: '',
                name: '',
                describe: '',
                started_year: '',
                certificate: [],
              },
              idiom: [],
            },
          },
          buttonType,
        }}
        onSubmit={() => {}}
      >
        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     name: yup.string().required('Nome obrigatório'),
        //     social_name: yup.string(),
        //     artistic_name: yup.string().min(4, 'Nome muito pequeno').max(10, 'Nome muito grande'),
        //     cpf: yup
        //       .string()
        //       .required('Cpf obrigatório')
        //       .min(11, 'Cpf incompleto'),
        //     birthday: yup
        //       .string()
        //       .required('Data de nascimento obrigatório')
        //       .min(8, 'Data incompleta'),
        //     rg: yup
        //       .string()
        //       .required('Rg é obrigatório')
        //       .min(7, 'Rg incompleto'),
        //     expedition_department: yup
        //       .string()
        //       .required('Orgão expedidor obrigatório'),
        //     address: yup.object({
        //       cep: yup.string().required('CEP obrigatório'),
        //       neighbourhood: yup.string().required('Bairro obrigatório'),
        //       number: yup.string().required('Número obrigatório'),
        //       complement: yup.string(),
        //       residency: yup.string().required('Endereço obrigatório'),
        //       address: yup.string().required('Endereço obrigatório'),
        //       state: yup.string().required('Estado obrigatório').default('null'),
        //       city: yup.string().required('Cidade obrigatória')
        //     }),
        //   }),
        // })}
        >
          <Step1 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     gender: yup.string().required('Campo obrigatório'),
        //     race: yup.string().required('Campo obrigatório'),
        //     sexual_orientation: yup.string().required('Campo obrigatório'),
        //     gender_identity: yup.string().required('Campo obrigatório'),
        //   }),
        // })}
        >
          <Step2 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     show_name: yup.string().required('Como quer ser chamado?'),
        //     photo_url: yup.string().required('Foto obrigatória'),
        //     email: yup.string().email('Email inválido').required('Email obrigatório'),
        //     contact: yup.object({
        //       whatsapp: yup.string(),
        //       twitter: yup.string().trim().matches(twitterUserRegex, "formato inválido"),
        //       facebook: yup.string().trim().matches(facebookUserRegex, "formato inválido"),
        //       instagram: yup.string().trim().matches(instagramUserRegex, "formato inválido"),
        //       linkedin: yup.string().trim().matches(linkedinUserRegex, "formato inválido"),
        //       tiktok: yup.string().trim().matches(tiktokUserRegex, "formato inválido"),
        //       youtube: yup.string().trim().matches(youtubeUserRegex, "formato inválido"),
        //     }),
        //   }),
        // })}
        >
          <Step3 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     technical: yup.object({
        //       formation: yup.string().required('Formação obrigatória'),
        //       idiom: yup.array().required('Pelo menos um obrigatório'),
        //     }),
        //   }),
        // })}
        >
          <Step4 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     technical: yup.object({
        //       area: yup.object({
        //         technical_formation: yup
        //           .string()
        //           .required('Campo obrigatório'),
        //         name: yup.string().required('Campo obrigatório'),
        //         curriculum: yup.string(),
        //       }),
        //     }),
        //   }),
        // })}
        >
          <Step5 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     technical: yup.object({
        //       area: yup.object({
        //         describe: yup.string().required('Descrição obrigatória'),
        //       }),
        //     }),
        //   }),
        // })}
        >
          <Step6 />
        </FormikStep>

        <FormikStep>
          <Step7 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   artist: yup.object({
        //     technical: yup.object({
        //       is_drt: yup.boolean().required('Campo obrigatório'),
        //       is_ceac: yup.boolean().required('Campo obrigatório'),
        //       is_cnpj: yup.boolean().required('Campo obrigatório'),
        //     }),
        //   }),
        // })}
        >
          <Step8 />
        </FormikStep>

        <FormikStep
        // validationSchema={yup.object({
        //   password: yup
        //     .string()
        //     .required('Senha obrigatória')
        //     .min(6, 'Senha no minimo 6 digítos'),
        //   confirm_password: yup.string().required('Confirmação obrigatória').when('password', {
        //     is: (val) => (val && val.length > 0 ? true : false),
        //     then: yup
        //       .string()
        //       .oneOf([yup.ref('password')], 'Senhas não são iguais.'),
        //   }),
        //   use_terms: yup.string().required('Termos de uso obrigatório')
        // })}
        >
          <Step9 />
        </FormikStep>
      </FormikStepper>
    </Container>
  )
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues & ButtonProps>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[]

  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  const [confirmEmailModal, setConfirmEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const modalRef = useRef<HTMLInputElement | null>(null)

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  // const closeModal = (e: any) => {
  //   if (modalRef.current === e.target) {
  //     setConfirmEmailModal(false)
  //   }
  // }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any) => {
        if (isLastStep()) {
          if (values.other_idiom) {
            const index = values.artist.technical.idiom.indexOf('Outro')

            values.artist.technical.idiom.splice(index, 1)

            values.artist.technical.idiom.push(values.other_idiom)

            delete values.other_idiom
          }

          if (values.artist.other_gender) {
            values.artist.gender = values.artist.other_gender

            delete values.artist.other_gender
          }

          if (values.Other_TechnicalArea) {
            values.artist.technical.areas.name = values.Other_TechnicalArea

            delete values.Other_TechnicalArea
          }

          delete values.artist.other_gender

          delete values.use_terms

          SignUp(values).then((res) => {
            setConfirmEmailModal(true)
            setEmail(values.email)
          })

          console.log(values)
        } else {
          setStep((currentStep) => currentStep + 1)
        }
      }}
    >
      <Form>
        
        <ConfirmEmailModal ref={modalRef} isOpen={confirmEmailModal} >
          <div className="confirmEmailContainer">
            <h1>Confirme seu email para verificar a conta</h1>
            <h2>
              O email com as instrucoes para ativacao e verificacao da conta
              foram enviados para {email}
            </h2>

            <div className="contact">
              <label>(XX) 1234-5678</label>
              <label htmlFor="">exemplo@ex.com.br</label>
            </div>

            <div className="socialMedias">
              <a href="#" target="blank">
                <FaYoutubeSquare />
              </a>
              <a href="#" target="blank">
                <FaFacebookSquare />
              </a>
              <a href="#" target="blank">
                <FaTwitterSquare />
              </a>
              <a href="#" target="blank">
                <FaGooglePlusSquare />
              </a>
              <a href="#" target="blank">
                <FaLinkedin />
              </a>
            </div>

            <button>VOLTAR</button>
          </div>
        </ConfirmEmailModal>

        <FormTitle level={1} children="Cadastre-se" />
        <SessionContainer>
          <FormContainer>
            <div className="form">{currentChild}</div>
            <RightSession currentStep={step}>
              <div className="sessionContainer">
                <div className={`formSession ${0 < step && 'checked'}`}>
                  <label>1</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${1 < step && 'checked'}`}>
                  <label>2</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${2 < step && 'checked'}`}>
                  <label>3</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${5 < step && 'checked'}`}>
                  <label>4</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${7 < step && 'checked'}`}>
                  <label>5</label>
                  <FaRegCheckCircle />
                </div>
                <div
                  className={`formSession ${8 < step && 'checked'}`}
                  onClick={() => setStep(8)}
                >
                  <label>6</label>
                  <FaRegCheckCircle />
                </div>
              </div>
            </RightSession>
            {step > 0 && (
              <BackButton
                type="button"
                onClick={() => setStep((currentStep) => currentStep - 1)}
              >
                VOLTAR
              </BackButton>
            )}
            <NextButton
              type={isLastStep() ? props.initialValues.buttonType : 'submit'}
            >
              {isLastStep() ? 'FINALIZAR' : 'AVANÇAR'}
            </NextButton>
          </FormContainer>
        </SessionContainer>
      </Form>
    </Formik>
  )
}