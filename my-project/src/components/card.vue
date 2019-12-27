<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
  text-align: center;
  color: rgb(64, 63, 63);
  font-family:Arial, Helvetica, sans-serif;
  font-size: 16px;
  
  
}

</style>
