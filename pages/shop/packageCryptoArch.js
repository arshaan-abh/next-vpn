import * as React from "react";
// reactstrap components
import {Button, Card, CardBody, Col, Row} from "reactstrap";
// layout for this page
import ShopLayout from "/layouts/Shop";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {registerActions} from "../../store/features/registerSlice";
import SnackAlert from "../../components/Dynamic/SnackAlert";

const validationSchema = yup.object().shape({});

function PackageCryptoArch() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {},
        validationSchema: validationSchema,
        onSubmit: (values) => {
        },
    });

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.register.loading);
    const error = useSelector((state) => state.register.error);
    const snackMessage = useSelector((state) => state.register.snackMessage);
    const stage = useSelector((state) => state.register.stage);

    React.useEffect(() => {
        if (snackMessage !== "") handleOpenSnack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackMessage]);

    React.useEffect(() => {
        if (stage === "register") {
            router.push("/auth/registerVerification");
            dispatch(registerActions.clearStage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    const [isSnackOpen, setIsSnackOpen] = React.useState(false);

    const handleOpenSnack = (text) => {
        setIsSnackOpen(true);
    };

    const handleCloseSnack = () => {
        setIsSnackOpen(false);
        dispatch(registerActions.clearSnackMessage());
    };

    return (
        <>
            <SnackAlert
                props={{
                    isSnackOpen,
                    handleCloseSnack,
                    snackMessage,
                    error: error,
                }}
            />

            <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center font-bold text-lg text-slate-800 mb-5">
                            Shop
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            Input here
                            <Row className="mx-0 justify-between">
                                <Button
                                    className="mt-4 !flex flex-row align-items-center h-12"
                                    color="white"
                                    type="submit"
                                >
                                    Back
                                </Button>
                                <Button
                                    className="mt-4 !flex flex-row align-items-center h-12"
                                    color="success"
                                    type="submit"
                                >
                                    Next
                                </Button>
                            </Row>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
}

PackageCryptoArch.layout = ShopLayout;

export default PackageCryptoArch;
