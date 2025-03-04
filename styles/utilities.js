import { create } from 'twrnc';

const tw = create({
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
      },
      fontWeight: {
        pregular: '400',
        psemibold: '600',
      },
    },
  },
});

export default tw;
