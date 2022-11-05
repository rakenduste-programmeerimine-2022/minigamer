import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SetupExample = () => {
    const { isLoading, error, data } = useQuery(
        ["helloWorld"],
        async () => {
            const res = await axios.get(".netlify/functions/helloWorld");
            return res.data;
        },
        { staleTime: 60 * 1000 }
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return <div>{data.message}</div>;
};

export default SetupExample;
