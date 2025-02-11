<script lang="ts" setup>

</script>

<template>
  <section class="tf__footer" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="tf__unlock">
              <div class="row">
                <div class="col-xl-2 col-md-12 col-lg-3 m-auto">
                  <div class="tf__unlock_img">
                    <img
                      src="/images/subscraib_img.png"
                      alt="unlock"
                      class="img-fluid w-100"
                    />
                  </div>
                </div>
                <div class="col-xl-5 col-sm-8 col-md-8 col-lg-5 mx-auto">
                  <div class="tf__unlock_text">
                    <div class="tf__common_heading tf__unlock_heading">
                      <h6>چندید برابر افزایش فروش</h6>
                      <h2>با راه اندازی وبسایت فروش خود را چندین برابر کنید!</h2>
                    </div>
                    <ul class="d-flex">
                      <li><i class="fi fi-rr-shield-trust"></i>افزایش اعتبار کسب و کار شما</li>
                      <li><i class="fi fi-rr-shield-trust"></i>دستیابی کسب و کار شما به هویت دیجیتال</li>
                    </ul>
                  </div>
                </div>
                <div
                  class="col-xl-4 col-sm-4 col-md-4 col-lg-4 m-auto d-flex justify-content-end"
                >
                  <div class="tf__unlock_btn">
                    <a href="signup.html" class="tf__common_btn"
                      >درخواست همکاری
                      <i class="fi fi-rr-arrow-small-left"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-2 col-sm-6 col-md-3">
            <div class="tf__footer_left">
              <a href="index.html" class="tf__footer_logo">
                استک تیم
              </a>
              <div class="tf__footer_icon d-flex flex-wrap align-items-center">
                <ul class="d-flex flex-wrap">
                  <li>
                    <a href="index.html#"><i class="fi fi-brands-linkedin"></i></a>
                  </li>
                  <li>
                    <a href="index.html#"><i class="fi fi-brands-telegram"></i></a>
                  </li>
                  <li>
                    <a href="index.html#"><i class="fi fi-brands-instagram"></i></a>
                  </li>
                  <li>
                    <a href="index.html#"><i class="fi fi-brands-github"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-sm-6 col-md-3">
            <div class="tf__quick_link">
              <h5>صفحات اصلی</h5>
              <ul>
                <li><a href="index.html#">خانه</a></li>
                <li><a href="index.html#">فرآیند کاری</a></li>
                <li><a href="index.html#">درباره ما</a></li>
                <li><a href="index.html#">تکنولوژی ها</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-2 col-sm-6 col-md-3">
            <div class="tf__quick_link tf__quick_link_sm">
              <h5>خدمات سایت</h5>
              <ul>
                <li><a href="index.html#">توسعه وبسایت</a></li>
                <li><a href="index.html#">توسعه نرم افزار</a></li>
                <li><a href="index.html#">توسعه اپلیکیشن موبایل</a></li>
                <li><a href="index.html#">طراحی UI/UX</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-2 col-sm-6 col-md-3">
            <div class="tf__quick_link tf__quick_link_sm">
              <h5>دسته بندی بلاگ</h5>
              <ul>
                <li><a href="index.html#">اخبار</a></li>
                <li><a href="index.html#">برنامه نویسی</a></li>
                <li><a href="index.html#">هوش مصنوعی</a></li>
                <li><a href="index.html#">آموزشی</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-4 col-md-12 mx-auto">
            <div class="tf__address tf__quick_link_sm tf__address_md">
              <h5>همین الان مشاوره بگیرید!</h5>
              <div class="tf__footer_singup">
                <form class="form-container">
                            <label for="phone" class="sr-only">شماره تلفن</label>
                            <div class="input-container">
                                <!-- <div class="icon-container">
                                    <i class="fi fi-rr-phone-flip"></i>
                                </div> -->
                                <input type="tel" id="phone" class="input-field"
                                    placeholder="شماره تلفن خود را وارد کنید..." required dir="rtl"/>
                                <button type="submit" class="submit-button">مشاوره</button>
                            </div>
                        </form>
              </div>
              <div class="form-desc">
                  در اولین فرصت با شما تماس میگیریم.
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <div
              class="tf__copyright d-flex flex-wrap justify-content-between mt_50 mb_30"
            >
              <p>© تمامی حقوق برای استک تیم محفوظ است.</p>
              <ul class="d-flex flex-wrap">
                <li><a href="index.html#">سایت مپ</a></li>
                <li><a href="index.html#">درباره ما</a></li>
                <li><a href="index.html#">درخواست همکاری</a></li>
                <li><a href="index.html#">خدمات</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style>
.form-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
.input-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}
.icon-container {
  position: absolute;
  margin-top: 7px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.icon {
  width: 16px;
  height: 16px;
  color: #666;
}
.input-field {
  width: 100%;
  padding: 12px 40px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  text-align: right;
}
.submit-button {
  position: absolute;
  left: 10px;
  padding: 4px 8px;
  background: #ff8565;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all .5s;
}
.submit-button:hover {
  background: #111013;
}
.form-desc {
  font-size: small;
  padding-top: 10px;
}
.fi-rr-shield-trust {
  margin-top: 5px;
}
</style>