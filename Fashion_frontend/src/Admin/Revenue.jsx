import axios from "axios";
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useProduct } from "../ProductContext";

function Revenue() {

    const {products} = useProduct();

    const [products_sold, setProducts_sold] = useState(products.sort((a, b) => b.sold_quantity - a.sold_quantity).slice(0,5));

    const [products_revenue, setProducts_revenue] = useState(products.sort((a, b) => b.revenue - a.revenue).slice(0,5));

    const [revenue, setRevenue] = useState([]);

    const [totalIncome, setTotalIncome] = useState(0);

    const [averageIncome, setAverageIncome] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/revenue')
            .then((response) => {
                setRevenue(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get('http://localhost:3001/api/users/number')
            .then((response) => {
                setTotalUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[])
    
    const [options, setOptions] = useState({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Average Revenue'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        min: 0,
        title: {
        text: 'Income (thousand $)'
        }
    },
    series: []
    });

    useEffect(() => {
        let data = [];
        revenue.forEach((item) => {
            data.push({
                name: item.year,
                data: item.revenue
            });
        });
        console.log(data);
        setOptions({...options, series: data})
    }, [revenue]);

    useEffect(() => {
        let total = 0;
        let count = 0;
        revenue.forEach((item) => {
            item.revenue.forEach((month) => {
                total += month;
                if (month > 0) count++;
            });
        });
        setTotalIncome(total);
        setAverageIncome(Math.floor(total/count));
    }, [revenue]);

    useEffect(() => {
        setProducts_sold(products.sort((a, b) => b.sold_quantity - a.sold_quantity).slice(0,5));
        setProducts_revenue(products.sort((a, b) => b.revenue - a.revenue).slice(0,5));
    }, [products]);

    return ( 
        <div style={{width: "100%"}}>
            <HighchartsReact highcharts={Highcharts} options={options} />

            <div>
                <p>Total incomes: {totalIncome}</p>
                <p>Average monthly income: {averageIncome}</p>
                <p>Number of users: {totalUsers}</p>


            </div>
            <div>
                <h2>Top 5 best selling products</h2>
                <div style={{display: "flex"}}>
                    {products_sold.map((product, index) => (
                        <div key={index} className="cardspp">
                            <img className="cardspp-image" src={product.image_link[0]} />
                            <p className="cardspp-title">{product.product_name}</p>
                            <p className="cardspp-price">{product.price}VND</p>
                            <p className="cardspp-price">Đã bán: {product.sold_quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
            <h2>Top 5 best selling products</h2>
                <div style={{display: "flex"}}>
                    {products_revenue.map((product, index) => (
                        <div key={index} className="cardspp">
                            <img className="cardspp-image" src={product.image_link[0]} />
                            <p className="cardspp-title">{product.product_name}</p>
                            <p className="cardspp-price">{product.price}VND</p>
                            <p className="cardspp-price">Doanh thu: {product.sold_quantity*product.price}đ</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );


}

export default Revenue;