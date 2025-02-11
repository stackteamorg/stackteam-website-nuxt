<script setup lang="ts">
import { onMounted, ref } from "vue";

// انیمیشن اسکرول برای ظاهر شدن آیتم‌ها
const elements = ref<NodeListOf<HTMLDivElement> | null>(null);
onMounted(() => {
  elements.value = document.querySelectorAll(".accordion-item");
  initAnimations();
});

const initAnimations = () => {
  if (!elements.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  elements.value.forEach((el) => observer.observe(el));
};

// مقدار اولیه: بخش اول باز باشه
const activeAccordion = ref<number>(1);

// فقط اگر بخش انتخابی غیر فعال بود، اون رو فعال می‌کنیم
const toggleAccordion = (index: number) => {
  if (activeAccordion.value !== index) {
    activeAccordion.value = index;
  }
};
</script>

<template>
  <section class="tf__work_process pb_50" dir="rtl">
    <div class="container">
      <div class="row">
        <div class="col-xl-8 m-auto">
          <div class="tf__common_heading">
            <h6>فرآیند کار</h6>
            <h2 class="tf__common_heading_color">مراحل توسعه وبسایت</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-5 col-lg-6 m-auto">
          <div class="tf__work_process_img">
            <img
              src="/images/work_img-1.jpg"
              alt="فرآیند توسعه وبسایت"
              class="img-fluid w-100"
            />
          </div>
        </div>
        <div class="col-xl-4 col-lg-5 mx-auto">
          <div class="tf__process_accordion">
            <div class="accordion" id="accordionExample">
              <!-- مرحله 1 -->
              <div class="accordion-item" :class="{ open: activeAccordion === 1 }">
                <h2 class="accordion-header" id="headingOne01">
                  <button
                    class="accordion-button tf__process_accordion_btn"
                    type="button"
                    @click="toggleAccordion(1)"
                  >
                    <span>1</span>
                    تحلیل نیازها و تعیین اهداف
                  </button>
                </h2>
                <transition name="accordion">
                  <div v-show="activeAccordion === 1" class="accordion-collapse">
                    <div class="accordion-body">
                      <p>
                        در این مرحله، نیازهای کسب‌وکار شما تحلیل شده و اهداف پروژه به‌طور دقیق تعیین می‌شوند.
                      </p>
                      <a href="#" class="tf__common_btn tf__accrodian_link">
                        شروع کنید
                        <i class="fi fi-rr-arrow-small-left"></i>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- مرحله 2 -->
              <div class="accordion-item" :class="{ open: activeAccordion === 2 }">
                <h2 class="accordion-header" id="headingTwo02">
                  <button
                    class="accordion-button tf__process_accordion_btn"
                    type="button"
                    @click="toggleAccordion(2)"
                  >
                    <span>2</span>
                    طراحی و نمونه‌سازی اولیه
                  </button>
                </h2>
                <transition name="accordion">
                  <div v-show="activeAccordion === 2" class="accordion-collapse">
                    <div class="accordion-body">
                      <p>
                        پس از تحلیل نیازها، طراحی اولیه و نمونه‌سازی وبسایت انجام می‌شود تا ایده‌ها به‌صورت بصری ارائه شوند.
                      </p>
                      <a href="#" class="tf__common_btn tf__accrodian_link">
                        شروع کنید
                        <i class="fi fi-rr-arrow-small-left"></i>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- مرحله 3 -->
              <div class="accordion-item" :class="{ open: activeAccordion === 3 }">
                <h2 class="accordion-header" id="headingThree03">
                  <button
                    class="accordion-button tf__process_accordion_btn"
                    type="button"
                    @click="toggleAccordion(3)"
                  >
                    <span>3</span>
                    توسعه و پیاده‌سازی
                  </button>
                </h2>
                <transition name="accordion">
                  <div v-show="activeAccordion === 3" class="accordion-collapse">
                    <div class="accordion-body">
                      <p>
                        در این مرحله، وبسایت بر اساس طراحی‌های تأیید شده توسعه داده شده و به‌صورت کامل پیاده‌سازی می‌شود.
                      </p>
                      <a href="#" class="tf__common_btn tf__accrodian_link">
                        شروع کنید
                        <i class="fi fi-rr-arrow-small-left"></i>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- مرحله 4 -->
              <div class="accordion-item" :class="{ open: activeAccordion === 4 }">
                <h2 class="accordion-header" id="headingFour04">
                  <button
                    class="accordion-button tf__process_accordion_btn"
                    type="button"
                    @click="toggleAccordion(4)"
                  >
                    <span>4</span>
                    تست و بهینه‌سازی
                  </button>
                </h2>
                <transition name="accordion">
                  <div v-show="activeAccordion === 4" class="accordion-collapse">
                    <div class="accordion-body">
                      <p>
                        در این مرحله، تست‌های مختلف انجام شده و عملکرد سایت بهینه‌سازی می‌شود تا بهترین تجربه کاربری ارائه شود.
                      </p>
                      <a href="#" class="tf__common_btn tf__accrodian_link">
                        شروع کنید
                        <i class="fi fi-rr-arrow-small-left"></i>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* انیمیشن اسکرول برای ظاهر شدن آیتم‌ها */
.accordion-item {
  opacity: 1;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.accordion-item.visible {
  opacity: 1;
  transform: translateY(0);
}

/* انیمیشن باز و بسته شدن آکاردئون */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.4s ease, opacity 0.4s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px; /* حداکثر ارتفاع مورد نظر؛ در صورت نیاز این مقدار رو تغییر بده */  
  opacity: 1;
}
</style>
