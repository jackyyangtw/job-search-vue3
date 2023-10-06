<template>
  <main class="flex min-h-screen flex-col">
    <section class="pt-10 pb-20">
      <PageLayout>
        <template #content>
          <div class="col-start-2 col-span-10 lg:col-span-5">
            <div class="lg:hidden">
              <img
                class="h-60 w-60 object-contain mx-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
                alt=""
              />
            </div>
            <TheHeadline />
            <JobSearchForm />
          </div>
          <div class="hidden lg:block col-start-7 col-span-5 self-center justify-self-center">
            <img
              class="h-80 w-80 object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
              alt=""
            />
          </div>
        </template>
      </PageLayout>
    </section>
    <section class="bg-gradient-to-b from-white to-brand-gray-1">
      <PageLayout>
        <template #content>
          <div class="col-start-2 col-span-10">
            <h2 class="mb-5 tracking-widest">Spotlights</h2>
            <SpotLight class="grid md:grid-cols-2 xl:grid-cols-4 gap-8 pb-16 2xl:min-h-[60vh]">
              <template #default="{ img, title, description, querys }">
                <router-link
                  :to="{
                    name: 'JobResults',
                    query: {
                      role: querys.join(' ')
                    }
                  }"
                  class="flex flex-col rounded-lg border bg-white shadow-md"
                >
                  <figure class="h-48" :style="{ background: `center/cover url(${img})` }"></figure>
                  <div class="mt-3 h-44 px-6 py-4">
                    <h3 class="text-lg font-medium">{{ title }}</h3>
                    <p class="mt-3 text-sm">{{ description }}</p>
                  </div>
                  <div class="px-6">
                    <router-link
                      to="/job-search-vue3/jobs/results"
                      class="flex items-center justify-center my-5 max-w-[120px] py-2 text-sm text-brand-blue-1 border border-solid border-brand-blue-1 rounded-md hover:bg-brand-blue-1 hover:text-white"
                      >See Jobs</router-link
                    >
                  </div>
                </router-link>
              </template>
            </SpotLight>
          </div>
        </template>
      </PageLayout>
    </section>
  </main>
</template>

<script setup lang="ts">
import TheHeadline from "./TheHeadline.vue"
import JobSearchForm from "./JobSearchForm.vue"
import SpotLight from "./SpotLight.vue"
import PageLayout from "../layouts/PageLayout.vue"
</script>
