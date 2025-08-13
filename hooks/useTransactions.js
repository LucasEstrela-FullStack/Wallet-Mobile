import { use, useCallback, useState } from "react"
import { Alert } from "react-native";

const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) =>{
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0
  });
  const [isLoading, setIsLoading] = useState(true);


  //useCallback é usado por razões de desempenho, ele irá memorizar a função
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("Error em buscar as transações",error);
    }
  }, [userId]);


  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error em buscar o Summary",error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if(!userId) return;

    setIsLoading(true);
    try {
      // busca as transações e o summary em parelelo
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.log("Error em buscar as transações e summary",error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransactions, fetchSummary]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {method: "DELETE"});
      if(!response.ok) throw new Error("Erro ao deletar transação");

      // Refresh data após o deletar
      loadData();
      Alert.alert("Transação deletada com sucesso");  
    } catch (error) {
      console.error("Error ao deletar transação", error);
      Alert.alert("Error ao deletar transação", error.message);
    }
  }

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
