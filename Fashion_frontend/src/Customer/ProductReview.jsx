import { useEffect, useState } from "react";
import { useProduct } from "../ProductContext";
import axios from "axios";
import StarRating from "./StarRating";

function ProductReview(props) {
    const { products } = useProduct();
    const order_products = props.order.products;

    // State để lưu trữ số sao và bình luận cho từng sản phẩm
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const initialReviews = order_products.reduce((acc, product) => {
            acc[product.productID] = { rating: 0, comment: "" };
            return acc;
        }, {});
        setReviews(initialReviews);
    }, [order_products]);

    // Hàm để cập nhật số sao
    const handleRatingChange = (productId, rating) => {
        setReviews(prev => ({
            ...prev,
            [productId]: { ...prev[productId], rating }
        }));
    };

    // Hàm để cập nhật bình luận
    const handleCommentChange = (productId, comment) => {
        setReviews(prev => ({
            ...prev,
            [productId]: { ...prev[productId], comment }
        }));
    };

    const validateReviews = () => {
        return order_products.every(product => reviews[product.productID] && reviews[product.productID].rating > 0);
    };

    // Hàm để gửi đánh giá
    const submitReview = () => {
        if (!validateReviews()) {
            alert("Please rate all products before submitting.");
            return;
        }

        axios.put('http://localhost:3001/api/reviews/new', reviews)
            .then(response => {
                if (response.status === 200) {
                    alert("Review submitted successfully");
                    props.onClose();
                } else {
                    alert("Internal server error");
                }
            })
            .catch(error => {
                alert("Internal server error");
            });
    };

    // Hàm để đóng cửa sổ
    const CloseWindow = (e) => {
        if (e.target.classList.contains("float-container")) {
            props.onClose();
        }
    };

    return (
        <div className="float-container" onClick={CloseWindow}>
            <div className="inner-content">
                {order_products.map(product => {
                    const productDetail = products.find(p => p._id === product.productID);
                    if (!productDetail) {
                        return null;
                    }
                    const review = reviews[product.productID] || { rating: 0, comment: "" };
                    return (
                        <div key={product.productID} className="product-review">
                            <h3>{productDetail.product_name}</h3>
                            <StarRating
                                rating={review.rating}
                                onRatingChange={(rating) => handleRatingChange(product.productID, rating)}
                            />
                            <br />
                            <label>
                                Comment:
                                <textarea
                                    value={review.comment}
                                    onChange={(e) => handleCommentChange(product.productID, e.target.value)}
                                />
                            </label>
                            <br />
                        </div>
                    );
                })}
                <button onClick={() => submitReview()}>Submit Review</button>
            </div>
        </div>
    );
}

export default ProductReview;
