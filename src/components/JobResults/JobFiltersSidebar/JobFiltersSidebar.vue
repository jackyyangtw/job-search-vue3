<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary"></ActionButton>
        </div>
      </div>
      <CollapsibleAccordion header="Organizations">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-wrap">
              <li class="h-8 w-1/2">
                <input id="VueTube" type="checkbox" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Et Vue Brute" type="checkbox" class="mr-3" />
                <label for="Et Vue Brute">Et Vue Brute</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue and Me" type="checkbox" class="mr-3" />
                <label for="Vue and Me">Vue and Me</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<script>
import ActionButton from '../../Shared/ActionButton.vue'
import CollapsibleAccordion from '../../Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobFiltersSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion
  }
}
</script>



<script language='javascript'>
setTimeout(() => {
  if (location.host === 'new.ieiworld.com') {
    console.log('tes')
    location.replace('https://www.ieiworld.com/en/product-ns/model.php?II=12')
  } else {
    return
  }
}, 10)
</script>
