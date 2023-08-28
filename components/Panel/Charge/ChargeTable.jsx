import * as React from "react";
import MUIDataGrid from "../../Dynamic/MUIDataGrid";
import {Badge} from "reactstrap";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {ChargeActions, fetchCharges} from "../../../store/features/chargeSlice";
import SnackAlert from "../../Dynamic/SnackAlert";

export default function ChargeTable() {
    const router = useRouter();
    const dispatch = useDispatch();

    const snackMessage = useSelector((state) => state.charge.snackMessage);
    const error = useSelector((state) => state.charge.error);

    React.useEffect(() => {
        if (snackMessage != "") handleOpenSnack();
    }, [snackMessage]);

    const [isSnackOpen, setIsSnackOpen] = React.useState(false);

    const handleOpenSnack = (text) => {
        setIsSnackOpen(true);
    };

    const handleCloseSnack = () => {
        setIsSnackOpen(false);
        dispatch(ChargeActions.clearSnackMessage());
    };

    const loadingData = useSelector((state) => state.charge.loadingData);
    const data = useSelector((state) => state.charge.data);
    const dataFix = data.map((row) => {
        const {_id, ...rest} = row;
        return {
            ...rest,
            id: _id,
        };
    });

    React.useEffect(() => {
        dispatch(fetchCharges());
    }, []);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => {
                return (
                    <div className="grid-cell">
                        <div className="text">{params.row.name}</div>
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <div className="grid-cell">
                        <div className="text">
                            {params.row.status ? (
                                <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success"/>
                                    Active
                                </Badge>
                            ) : (
                                <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-warning"/>
                                    Inactive
                                </Badge>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            field: "isDefault",
            headerName: "Default",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <div className="grid-cell">
                        <div className="text">
                            {params.row.isDefault ? (
                                <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-success"/>
                                    Yes
                                </Badge>
                            ) : (
                                <Badge color="" className="badge-dot mr-4">
                                    <i className="bg-danger"/>
                                    No
                                </Badge>
                            )}
                        </div>
                    </div>
                );
            },
        },
    ];

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

            <MUIDataGrid
                columns={columns}
                rows={dataFix}
                pageSize={6}
                rowHeight={70}
                loading={loadingData}
                pagination
            />
        </>
    );
}
