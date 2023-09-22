<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <li class="mb-7">
        <slot name="content"></slot>
      </li>
    </ol>
    <slot name="bottom"></slot> 
  </main>
</template>
