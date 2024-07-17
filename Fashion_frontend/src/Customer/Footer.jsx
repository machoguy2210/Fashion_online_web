import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="site-footer__inner">
                    <div className="site-footer__sidebar">
                        <div>
                            <h4 className="site-footer__title">Chúng tôi lắng nghe bạn!</h4> 
                            <p className="site-footer__description" style={{ marginBottom: '30px' }}>
                                Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
                            </p> 
                        </div> 
                        <div style={{ width: '25%' }}>
                            <div className="footer-info">
                                <div className="footer-info__icon">
                                    <img src="https://www.coolmate.me/images/footer/icon-hotline.svg" alt="Footer Icon Phone" />
                                </div> 
                                <div className="footer-info__content">
                                    <span className="footer-info__title">Hotline</span> 
                                    <p className="footer-info__desciption">
                                        <a style={{textDecoration: "none"}} href="tel:1900272737">1900.272737</a> - <a style={{textDecoration: "none"}} href="tel:02877772737">028.7777.2737</a> <br/> <span>(8:30 - 22:00)</span>
                                    </p>
                                </div>
                            </div>
                            <div className="footer-info">
                                <div className="footer-info__icon">
                                    <img src="https://www.coolmate.me/images/footer/icon-email.svg" alt="Footer Icon Email"/>
                                </div>
                                <div className="footer-info__content">
                                    <span className="footer-info__title">Email</span>
                                    <p className="footer-info__desciption"><a style={{textDecoration: "none"}} href="#">ElMacho@gmail.com</a></p>
                                </div>
                            </div>
                        </div> 
                        <div className="footer-social">
                            <a style={{textDecoration: "none"}} href="https://www.facebook.com/coolmate.me" target="_blank" className="footer-social__item" rel="noopener noreferrer">
                                <img src="https://mcdn.coolmate.me/image/June2023/mceclip1_43.png" alt="Footer Icon facebook" />
                            </a> 
                            <a style={{textDecoration: "none"}} href="https://zalo.me/1517736583279228381" target="_blank" className="footer-social__item" rel="noopener noreferrer">
                                <img src="https://mcdn.coolmate.me/image/June2023/mceclip2_68.png" alt="Footer Icon Zalo" />
                            </a> 
                            <a style={{textDecoration: "none"}} href="https://www.tiktok.com/@cool.coolmate" target="_blank" className="footer-social__item" rel="noopener noreferrer">
                                <img src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png" alt="Footer Icon tiktok" />
                            </a> 
                            <a style={{textDecoration: "none"}} href="https://www.instagram.com/coolmate.me/" target="_blank" className="footer-social__item" rel="noopener noreferrer">
                                <img src="https://www.coolmate.me/images/footer/icon-instar.svg" alt="Footer Icon instar" />
                            </a> 
                            <a style={{textDecoration: "none"}} href="https://www.youtube.com/channel/UCWw8wLlodKBtEvVt1tTAsMA" target="_blank" className="footer-social__item" rel="noopener noreferrer">
                                <img src="https://www.coolmate.me/images/footer/icon-youtube.svg" alt="Footer Icon youtube" />
                            </a>
                        </div>
                    </div> 
                    <div className="site-footer__menu">
                        <div className="footer-menu">
                            <div className="footer-menu__item">
                                <h4 className="footer-menu__title">Chính sách</h4> 
                                <ul>
                                    <li><a style={{textDecoration: "none"}} href="/page/dich-vu-60-ngay-doi-tra">Chính sách đổi trả 60 ngày</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/chuong-trinh-va-chinh-sach-khuyen-mai-tai-coolmate">Chính sách khuyến mãi</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/chinh-sach-bao-mat-thong-tin-ca-nhan">Chính sách bảo mật</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/dich-vu-giao-hang-coolmate">Chính sách giao hàng</a></li>
                                </ul> 
                            </div> 
                            <div className="footer-menu__item">
                                <h4 className="footer-menu__title">Chăm sóc khách hàng</h4> 
                                <ul>
                                    <li><a style={{textDecoration: "none"}} href="/page/11-dich-vu-tai-coolmate-co-the-ban-chua-biet">Trải nghiệm mua sắm 100% hài lòng</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/faqs">Hỏi đáp - FAQs</a></li>
                                </ul> 
                                <h4 className="footer-menu__title">Kiến thức mặc đẹp</h4> 
                                <ul>
                                    <li><a style={{textDecoration: "none"}} href="/size-chart">Hướng dẫn chọn size</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/blog">Blog</a></li>
                                </ul>
                            </div> 
                            <div className="footer-menu__item">
                                <h4 className="footer-menu__title">Tài liệu - Tuyển dụng</h4> 
                                <ul>
                                    <li><a style={{textDecoration: "none"}} href="#">Tuyển dụng</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="#" target="_blank" rel="noopener noreferrer">Đăng ký bản quyền</a></li>
                                </ul> 
                                <h4 className="footer-menu__title">VỀ CHÚNG TÔI</h4> 
                                <ul>
                                    <li><a style={{textDecoration: "none"}} href="/lp/coolmate-101?itm_source=footer">Coolmate 101</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/11-dich-vu-tai-coolmate-co-the-ban-chua-biet?itm_source=footer">DVKH xuất sắc</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/coolmate-story?itm_source=footer"> Câu chuyện VỀ CHÚNG TÔI</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/page/san-pham-coolmate-duoc-san-xuat-nhu-the-nao?itm_source=footer">Nhà máy</a></li> 
                                    <li><a style={{textDecoration: "none"}} href="/collection/care-and-share?itm_source=footer">Care &amp; Share</a></li>
                                </ul>
                            </div> 
                            <div className="footer-menu__item">
                                <h4 className="footer-menu__title">Địa chỉ liên hệ</h4> 
                                <p className="footer-menu__desciption"><u>Văn phòng Hà Nội:</u> Tầng 3 Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội</p> 
                                <p className="footer-menu__desciption"><u>Trung tâm vận hành Hà Nội:</u> Lô C8, KCN Lại Yên, Xã Lại Yên, Huyện Hoài Đức, Thành phố Hà Nội</p> 
                                <p className="footer-menu__desciption"><u>Văn phòng và Trung tâm vận hành TP. HCM:</u> Lô C3, đường D2, KCN Cát Lái, Thạnh Mỹ Lợi, TP. Thủ  Đức, TP. Hồ Chí Minh.</p> 
                                <p className="footer-menu__desciption"><u>Trung tâm R&amp;D:</u> Tầng 2, NXLP - 24, Khu The Manhattan - Vinhomes Grand Park, TP. Thủ Đức, TP. HCM</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </footer>
    );
}

export default Footer;
