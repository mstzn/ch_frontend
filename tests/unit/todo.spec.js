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

  it('add some todo and see on the list', async () => {
    const wrapper = shallowMount(ToDoList, {})

    const todoText = 'some todo';
    wrapper.find("input").setValue(todoText);
    await wrapper.find("button").trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("ul").text()).toMatch(todoText)
      done()
    });
  })

})
