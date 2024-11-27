import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContextProvider";
import PropTypes from "prop-types";

function ProtectedRoute({ component: Component }) {
    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user?.email && Component) {
        return <Component />;
    }

    return null;
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;