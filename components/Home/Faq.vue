<template>
    <section class="tf__faq pt_100 pb_240" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-md-8 m-auto">
            <div class="tf__common_heading tf__faq_common_heading">
              <h6>سوالات متداول</h6>
              <h2 class="tf__common_heading_color">
                سوالات پرتکرار درباره خدمات ما
              </h2>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-xl-8 col-md-8 col-lg-8 mx-auto">
            <div class="accordion tf__faq_accordion" id="accordionExample01">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    @click="toggleAccordion('collapseOne')"
                    :aria-expanded="isOpen.collapseOne"
                    aria-controls="collapseOne"
                  >
                    خدمات طراحی وب شامل چه مواردی می‌شود؟
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse"
                  :class="{ show: isOpen.collapseOne }"
                  aria-labelledby="headingOne"
                >
                  <div class="accordion-body">
                    <p>
                      خدمات طراحی وب شامل طراحی رابط کاربری، توسعه وب‌سایت، بهینه‌سازی برای موتورهای جستجو (SEO) و پشتیبانی فنی می‌شود. ما با استفاده از آخرین تکنولوژی‌ها، وب‌سایت‌هایی زیبا و کاربردی برای شما ایجاد می‌کنیم.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    @click="toggleAccordion('collapseTwo')"
                    :aria-expanded="isOpen.collapseTwo"
                    aria-controls="collapseTwo"
                  >
                    مدت زمان تحویل پروژه چقدر است؟
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse"
                  :class="{ show: isOpen.collapseTwo }"
                  aria-labelledby="headingTwo"
                >
                  <div class="accordion-body">
                    <p>
                      مدت زمان تحویل پروژه بستگی به پیچیدگی و اندازه پروژه دارد. به طور معمول، پروژه‌های کوچک در عرض 2 تا 4 هفته و پروژه‌های بزرگ‌تر در عرض 6 تا 8 هفته تحویل داده می‌شوند.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    @click="toggleAccordion('collapseThree')"
                    :aria-expanded="isOpen.collapseThree"
                    aria-controls="collapseThree"
                  >
                    آیا امکان سفارشی‌سازی طراحی وجود دارد؟
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse"
                  :class="{ show: isOpen.collapseThree }"
                  aria-labelledby="headingThree"
                >
                  <div class="accordion-body">
                    <p>
                      بله، ما به طور کامل با نیازها و ترجیحات شما هماهنگ می‌شویم و طراحی‌ها را به طور کامل سفارشی‌سازی می‌کنیم تا مطابق با برند و اهداف شما باشد.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    @click="toggleAccordion('collapseFour')"
                    :aria-expanded="isOpen.collapseFour"
                    aria-controls="collapseFour"
                  >
                    هزینه طراحی وب‌سایت چقدر است؟
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse"
                  :class="{ show: isOpen.collapseFour }"
                  aria-labelledby="headingFour"
                >
                  <div class="accordion-body">
                    <p>
                      هزینه طراحی وب‌سایت بستگی به ویژگی‌ها و پیچیدگی پروژه دارد. ما پس از بررسی نیازهای شما، یک پیش‌فاکتور دقیق ارائه می‌دهیم.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    @click="toggleAccordion('collapseFive')"
                    :aria-expanded="isOpen.collapseFive"
                    aria-controls="collapseFive"
                  >
                    آیا پس از تحویل پروژه پشتیبانی ارائه می‌دهید؟
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse"
                  :class="{ show: isOpen.collapseFive }"
                  aria-labelledby="headingFive"
                >
                  <div class="accordion-body">
                    <p>
                      بله، ما پس از تحویل پروژه، خدمات پشتیبانی فنی و به‌روزرسانی‌های لازم را ارائه می‌دهیم تا وب‌سایت شما همیشه به‌روز و بدون مشکل باشد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const isOpen = ref({
    collapseOne: false,
    collapseTwo: false,
    collapseThree: false,
    collapseFour: false,
    collapseFive: false,
  });
  
  const toggleAccordion = (id: string) => {
    isOpen.value[id] = !isOpen.value[id];
  };
  </script>
  
  <style scoped>
  .tf__faq {
    padding: 100px 0;
  }
  
  .tf__common_heading {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .tf__common_heading h6 {
    font-size: 18px;
    color: #666;
  }
  
  .tf__common_heading h2 {
    font-size: 36px;
    color: #333;
  }
  
  .accordion-button {
    padding: 15px;
    font-size: 18px;
    color: #333;
    text-align: right;
    width: 100%;
    cursor: pointer;
  }
  
  .accordion-button:focus {
    box-shadow: none;
  }
  
  .accordion-button:not(.collapsed) {
  }
  
  .accordion-collapse {
    transition: max-height 0.3s ease-out;
    overflow: hidden;
    max-height: 0;
  }
  
  .accordion-collapse.show {
    max-height: 500px; /* Adjust based on content */
  }
  
  .accordion-body {
    padding: 15px;
    border-top: none;
    font-size: 16px;
    color: #555;
    text-align: right;
  }
  </style>