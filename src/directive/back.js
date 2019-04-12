export default {
  back : {
    inserted (el) {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('点击返回')
        history.back()
      })
    }
  }
}