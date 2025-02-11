<template>
    <section class="tf__banner pt_160" dir="rtl">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 m-auto">
                    <div class="tf__banner_text">
                        <h6>با استک تیم صاحب یک وبسایت شوید</h6>
                        <h1>تا 50% تخفیف</h1>
                        <p>
                            بهترین تجربه کاربری را به مشتریانتان هدیه دهید!
                            <br />
                            همین الان سفارش دهید.
                        </p>
                        <form class="form-container">
                            <label for="phone" class="sr-only">شماره تلفن</label>
                            <div class="input-container">
                                <div class="icon-container">
                                    <i class="fi fi-rr-phone-flip"></i>
                                </div>
                                <input type="tel" id="phone" class="input-field"
                                    placeholder="شماره تلفن خود را وارد کنید..." required dir="rtl"/>
                                <button type="submit" class="submit-button">مشاوره</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-10 m-auto">
                    <div class="tf__banner_img">
                        <img src="/images/banner_img.jpg" alt="banner img" class="img-fluid w-100" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
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
</style>