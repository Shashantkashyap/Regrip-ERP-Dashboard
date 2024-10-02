import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useScrapData(selectVal, customDateRange, tyreListFilter) {
  const [countData, setCountData] = useState();
  const [brandData, setBrandData] = useState();
  const [reasonData, setReasonData] = useState();
  const [vehicleData, setVehicleData] = useState();
  const [doughnutData, setDoughnutData] = useState();
  const [nsdData, setNsdData] = useState();
  const [tyreList, setTyreList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const knowUser = JSON.parse(localStorage.getItem("userData"));
  const apiKey = knowUser.data.api_key;

  const url = "https://newstaging.regripindia.com/api";

  const fetchTyreCount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/scrap/total-scrap-count`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Response Data: ", response.data.data[0]);
      // setTotalPages(responseData.pagination.total);
      setCountData(response.data.data[0] || []);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchBrandWiseData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/scrap/brand-wise`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Response Data: ", response.data.data);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.data;
      if (data) {
        const updatedData = data.map((item) => {
          const { brand_id, ...rest } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });

        console.log("Updated Data: ", updatedData);
        setBrandData(updatedData);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchReasonWiseData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/scrap/reason-wise`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Response Data: ", response.data.data);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.data;
      if (data) {
        let sum = data?.reduce((acc, curr) => acc + curr.total_tyres, 0);
        console.log("Sum: ", sum);

        const updatedData = data.map((item) => {
          item.scrap_percent = `${((item.total_tyres / sum) * 100).toFixed(
            2
          )}%`;
          const {
            tp_entity_id,
            current_status,
            serial_no,
            defect_id,
            defect_type,
            ...rest
          } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });

        console.log("Updated Data: ", updatedData);
        setReasonData(updatedData);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchVehicleWiseData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-vehicle-counts`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Vehicle Data: ", response.data.vehicleScrapCounts);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.vehicleScrapCounts;
      if (data) {
        const updatedData = data.map((item) => {
          const {
            tp_entity_id,
            current_status,
            serial_no,
            defect_id,
            defect_type,
            ...rest
          } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });

        console.log("Updated Data: ", updatedData);
        setVehicleData(updatedData);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchDoughnutChartData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-defect-counts`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("doughnutData Data: ", response.data.defectCounts);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.defectCounts;
      if (data) {
        const chartData = data?.map(item => item[0].defectCount);
        setDoughnutData(chartData);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchNsdData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-scrap-tyre-nsd-counts`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Nsd Data: ", response.data.nsdScrapCounts);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.nsdScrapCounts;
      if (data) {
        const chartData = [data[0].tyre_count, data[3].tyre_count, data[4].tyre_count, data[1].tyre_count, data[2].tyre_count];
        setNsdData(chartData);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal]);

  const fetchTyreListDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/scrap/tyre-list-details`,
        { date_filter: selectVal },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Tyre List Data: ", response.data.data);
      // setTotalPages(responseData.pagination.total);
      const data = response.data.data;
      if (data) {
        setTyreList(data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal, tyreListFilter]);

  useEffect(() => {
    fetchTyreCount();
    fetchBrandWiseData();
    fetchReasonWiseData();
    fetchVehicleWiseData();
    fetchDoughnutChartData();
    fetchNsdData();
    // console.log("API Key: ", apiKey);
  }, [selectVal, customDateRange]);

  useEffect(() => {
    fetchTyreListDetails();
  }, [selectVal, customDateRange, tyreListFilter]);

  return { countData, brandData, reasonData, vehicleData, doughnutData, nsdData, tyreList, loading, error };
}

export default useScrapData;
