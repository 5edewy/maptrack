'use strict';
import { StyleSheet, } from 'react-native';

// Colors 
export const black_color = "#000"
export const white_color = "#fff"
export const gray_color = "#8b8989"
export const Primary_color = "rgb(54,132,196)"





const styles = StyleSheet.create({

  //  PAYMENT SCREEN
  labelText: {
    fontWeight: 'bold',
    color: black_color,
    fontSize: 16
  },
  labelsubText: {
    fontWeight: '700',
    color: gray_color,
    fontSize: 14,
    marginTop: 5
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderRadius: 8,
  },
  additionalCardStyle: {
    width: '100%',
    borderRadius: 8,
    height: 50,
    marginVertical: '10%',
    elevation: 2
  },
  cancelBTN: {
    marginVertical: '2%',
    marginTop: 10
  },
  paymentContainer: {
    flex: 1,
    paddingHorizontal: '4%',
    paddingTop: '8%'
  },

  // HOME SCREEN


  carIMG: {
    width: 60,
    height: 60
  },
  holderbtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  }

});

export default styles;
