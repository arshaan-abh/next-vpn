import Header from "../../components/Headers/Header";
import AdminLayout from "/layouts/Admin";
import {Container, Row} from "reactstrap";
import * as React from "react";
import StatusCard from "../../components/Panel/Admin/StatusCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchReports, userActions} from "../../store/features/userSlice";
import SnackAlert from "../../components/Dynamic/SnackAlert";

function Admin() {
    const dispatch = useDispatch();

    const snackMessage = useSelector((state) => state.user.snackMessage);
    const loadingAction = useSelector((state) => state.user.loadingAction);
    const error = useSelector((state) => state.user.error);

    React.useEffect(() => {
        if (snackMessage !== "") handleOpenSnack();

        if (!loadingAction && snackMessage !== "" && !error) {
            dispatch(fetchReports());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackMessage]);

    const [isSnackOpen, setIsSnackOpen] = React.useState(false);

    const handleOpenSnack = () => {
        setIsSnackOpen(true);
    };

    const handleCloseSnack = () => {
        setIsSnackOpen(false);
        dispatch(userActions.clearSnackMessage());
    };

    const loadingData = useSelector((state) => state.user.loadingData);
    const data = useSelector((state) => state.user.data);

    React.useEffect(() => {
        dispatch(fetchReports());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <SnackAlert
            props={{
                isSnackOpen,
                handleCloseSnack,
                snackMessage,
                error: error,
            }}
        />

        <Header/>
        <Container className="mt--9" fluid>
            <Row>
                <div className="col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <StatusCard
                            number={data?.users?.total}
                            text="Users joined today"
                            iconClass="ni ni-circle-08"
                            backColorClass="bg-blue-400"/>
                        <StatusCard
                            number={data?.charges?.total}
                            text="Charges done in 24h"
                            iconClass="ni ni-money-coins"
                            backColorClass="bg-purple-400"/>
                        <StatusCard
                            number={data?.vpns?.total}
                            text="Vpns purchased today"
                            iconClass="ni ni-lock-circle-open"
                            backColorClass="bg-green-400"/>
                    </div>
                </div>
            </Row>
        </Container>
    </>;
}

Admin.layout = AdminLayout;

export default Admin;