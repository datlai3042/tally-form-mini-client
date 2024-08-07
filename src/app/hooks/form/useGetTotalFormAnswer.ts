import { onFetchTotalAnswer } from "@/app/_lib/redux/formAnswer.slice";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetTotalFormAnswer = () => {
      const dispatch = useDispatch();

      const getTotalFormAnswer = useQuery({
            queryKey: ["get-total-form-answer"],
            queryFn: () => FormAnswerService.getTotalFormAnswer(),
      });

      useEffect(() => {
            if (getTotalFormAnswer.isSuccess) {
                  const { total } = getTotalFormAnswer.data.metadata;
                  dispatch(onFetchTotalAnswer({ total_answers: total }));
            }
      }, [getTotalFormAnswer.isSuccess, dispatch, getTotalFormAnswer.data?.metadata]);

      return getTotalFormAnswer;
};

export default useGetTotalFormAnswer;
