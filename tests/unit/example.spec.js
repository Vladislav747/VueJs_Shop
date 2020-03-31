import { shallowMount, createLocalVue } from '@vue/test-utils'
import FooterNavigation from '@/components/FooterNavigation.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);


describe('FooterNavigation.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(FooterNavigation, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg)
  })
})
