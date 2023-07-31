import React, {useState} from "react"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
} from "reactstrap"
import Auth from "/layouts/Auth.js"
import VerificationInput from "react-verification-input"
import styles from "/styles/verification-input.module.css"

function ForgetPassword() {
    const [isCodeSent, setIsCodeSent] = useState(false)

    return (<>
        <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <small>Or enter your email in order to reset your password</small>
                    </div>
                    <Form role="form">
                        <FormGroup disabled={isCodeSent} className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83"/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    autoComplete="new-email"
                                />
                            </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                disabled={isCodeSent}
                                onClick={() => setIsCodeSent(true)}>
                                Send code
                            </Button>
                            {isCodeSent &&
                                <VerificationInput
                                    autoFocus={true}
                                    placeholder="0"
                                    validChars="0-9"
                                    length={6}
                                    inputProps={{className: styles.wrap}}
                                    classNames={{
                                        container: `${styles.container}`,
                                        character: `${styles.character}`,
                                        characterInactive: styles.characterInactive,
                                        characterSelected: styles.characterSelected,
                                    }}
                                />
                            }
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <Row className="mt-3">
                <Col xs="6">
                    <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        <small>Already have an account?</small>
                    </a>
                </Col>
                <Col className="text-right" xs="6">
                    <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}>
                        <small>Create new account</small>
                    </a>
                </Col>
            </Row>
        </Col>
    </>)
}

ForgetPassword.layout = Auth

export default ForgetPassword
