import { shallowMount } from '@vue/test-utils'
import ToDoList from '@/components/ToDoList.vue'

describe('ToDoList.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'ToDos'
    const wrapper = shallowMount(ToDoList, {
      props: { title }
    })
    expect(wrapper.text()).toMatch(title)
  })

})
