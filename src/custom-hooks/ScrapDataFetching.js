import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useScrapData(selectVal, customDateRange, tyreListFilter) {
  const [countData, setCountData] = useState();
  const [realBrandData, setRealBrandData] = useState();
  const [realReasonData, setRealReasonData] = useState();
  const [realVehicleData, setRealVehicleData] = useState();
  const [realDoughnutData, setRealDoughnutData] = useState();
  const [realNsdData, setRealNsdData] = useState();
  const [realTyreListDataCount, setRealTyreListDataCount] = useState();
  const [brandData, setBrandData] = useState();
  const [reasonData, setReasonData] = useState();
  const [vehicleData, setVehicleData] = useState();
  const [doughnutData, setDoughnutData] = useState();
  const [nsdData, setNsdData] = useState();
  const [tyreList, setTyreList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const [totalPages, setTotalPages] = useState(0);
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
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Tyre Count Data: ", response.data.data[0]);
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
    let sum = 0;

    try {
      const response = await axios.post(
        `${url}/scrap/brand-wise`,
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
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
          item.scrap_percent = ((item?.scrap_per_brand / (countData?.total_scrap_count || countData?.current_scrap_count)) * 100).toFixed(2);
          sum += item.scrap_per_brand;
          const { brand_id, tyres_per_brand, action, tyre_status, action_date, tyre_id, ...rest } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });

        console.log("Brand Data: ", updatedData);
        setBrandData(updatedData?.sort((a, b) => b.scrap_percent - a.scrap_percent));
        setRealBrandData(sum);
      } else {
        setBrandData([]);
        setRealBrandData(0);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal, countData]);

  const fetchReasonWiseData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let sum = 0;

    try {
      const response = await axios.post(
        `${url}/scrap/reason-wise`,
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
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
       if(selectVal === "total_count") {
        const updatedData = data?.map((item) => {
          item.scrap_percent = ((item?.scrap_count / (countData?.total_scrap_count || countData?.current_scrap_count)) * 100).toFixed(
            2
          );
          sum += item.scrap_count;
          const {
            tp_entity_id,
            current_status,
            serial_no,
            defect_id,
            defect_type,
            tyre_status,
            action,
            ...rest
          } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });
        console.log("Reason Data: ", sum);
        setRealReasonData(sum);
        setReasonData(updatedData?.sort((a, b) => b?.scrap_count - a?.scrap_count));
       } else {
        const updatedData = data?.map((item) => {
          item.scrap_percent = ((item?.tyres_count_with_reason / (countData?.total_scrap_count || countData?.current_scrap_count)) * 100).toFixed(
            2
          );
          sum += item.tyres_count_with_reason;
          const {
            tp_entity_id,
            current_status,
            serial_no,
            defect_id,
            defect_type,
            tyre_status,
            action,
            ...rest
          } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });
        console.log("Reason Data: ", sum);
        setRealReasonData(sum);
        setReasonData(updatedData?.sort((a, b) => b?.tyres_count_with_reason - a?.tyres_count_with_reason));
       }
      } else {
        setReasonData([]);
        setRealReasonData(0);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal, countData]);

  const fetchVehicleWiseData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let sum = 0;

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-vehicle-counts`,
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
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
          sum += item.scrap_count;
          const {
            tp_entity_id,
            current_status,
            serial_no,
            defect_id,
            // defect_type,
            ...rest
          } = item; // Destructure to exclude brand_id
          return rest; // Return the remaining properties
        });

        console.log("Scrap counts before sorting: ", updatedData.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)));
        setRealVehicleData(sum);
        updatedData?.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
        console.log("Sorted data: ", updatedData);

        setVehicleData(updatedData);
      } else {
        setVehicleData([]);
        setRealVehicleData(0);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal, customDateRange]);

  const fetchDoughnutChartData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let sum = 0;

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-defect-counts`,
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("doughnutData Data: ", response.data);
      // setTotalPages(responseData.pagination.total);
      let data = response.data.defectCounts;
      if (data) {
        let chartData = data?.map(item => {
          console.log("Checking Doughnut Data: ", item, item[0].defectCount);
          
          return  item[0].defectCount
        });
        sum = chartData?.reduce((acc, curr) => acc + curr, 0);
        setRealDoughnutData(sum);
        data = chartData;
        console.log("Doughnut: ", chartData);
        if(chartData.length < 4) {
          chartData = [];
          for(let i = 0; i < 4; i++) {
            chartData.push(data[i] || 0);
          }
        }
        setDoughnutData(chartData);
      } else {
        setRealDoughnutData(0);
        setDoughnutData([]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [selectVal, customDateRange]);

  const fetchNsdData = useCallback(async () => {
    setLoading(true);
    setError(null);
    let sum = 0;

    try {
      const response = await axios.post(
        `https://newstaging.regripindia.com/api/get-scrap-tyre-nsd-counts`,
        { date_filter: selectVal, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
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
        const chartData = [data[0]?.tyre_count, data[3]?.tyre_count, data[4]?.tyre_count, data[1]?.tyre_count, data[2]?.tyre_count];
        setNsdData(chartData);
      } else {
        setNsdData([]);
        setRealNsdData(0);
      }

      sum = data?.reduce((acc, curr) => acc + curr.tyre_count, 0);
      setRealNsdData(sum);
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
        { date_filter: selectVal, page_no: tyreListFilter.page_no, limit: 10, ...tyreListFilter, start_date: customDateRange?.startDate, end_date: customDateRange?.endDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${apiKey}`,
          },
        }
      );

      console.log("Tyre List Data: ", response.data);
      // setTotalPages(responseData.pagination.total);
      const data = response.data;
      if (data) {
        setTyreList(data);
      } else {
        setTyreList([]);
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
    fetchVehicleWiseData();
    fetchDoughnutChartData();
    fetchNsdData();
  }, [selectVal, customDateRange]);

  useEffect(() => {
    if (countData) {
      fetchBrandWiseData();
      fetchReasonWiseData();
    }
  }, [countData, selectVal, customDateRange]);
  
  useEffect(() => {
    fetchTyreListDetails();
  }, [selectVal, customDateRange, tyreListFilter, currentPage]);

  // useEffect(() => {
  //   const filterTyreList = tyreList?.filter((item) => item?.brand_name === tyreListFilter?.brand_name || item?.scrap_reason === tyreListFilter.reason || item?.vehicle_no === tyreListFilter.vehicle_no);
  //   setTyreList(filterTyreList);
  //   console.log("TyreListFilter: ", tyreListFilter);
    
  // }, [tyreListFilter]);

  useEffect(() => {
    console.log("TyreList: ", tyreList, realTyreListDataCount);
    setRealTyreListDataCount(tyreList?.data?.length);
  }, [tyreList, realTyreListDataCount]);

  useEffect(() => {
    console.log("Data: ", brandData, reasonData, vehicleData, doughnutData, tyreList);
  }, [brandData, reasonData, vehicleData, doughnutData, tyreList]);

  return { countData, brandData, reasonData, vehicleData, doughnutData, nsdData, tyreList, currentPage, setCurrentPage, itemsPerPage, realBrandData, realReasonData, realVehicleData, realDoughnutData, realNsdData, realTyreListDataCount, loading, error };
}

export default useScrapData;
