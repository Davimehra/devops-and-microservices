export const themes = ['Normal', 'NightLight', 'Light', 'Colorblind'];

export const themesStyle = {
    'Normal': {
        contentAndOption: {
            backgroundColor: '#64B5F6'
        },
        content: {
            continueButton_BackgroundColor: '#76FF03',
            continueButton_BackgroundColor_Hover: "#6dd717",
            SwitchButton_BackgroundColor: '#76FF03',
            SwitchButton_BackgroundColor_Hover: "#6dd717"
        },
        options: {
            optionButton_BackgroundColor: '#64B5F6',
            optionContent_BackgroundColor_Hover: '#76FF03',
            collapesButton_BackgroundColor: '#76FF03',
            collapesButton_BackgroundColor_Hover: '#6dd717',

        }
    },
    'NightLight': {

        contentAndOption: {
            backgroundColor: 'black'
        },
        content: {
            continueButton_BackgroundColor: '#E0E0E0',
            continueButton_BackgroundColor_Hover: "grey",
            SwitchButton_BackgroundColor: '#E0E0E0',
            SwitchButton_BackgroundColor_Hover: "grey"
        },
        options: {
            optionButton_BackgroundColor: 'grey',
            optionContent_BackgroundColor_Hover: '#E0E0E0',
            collapesButton_BackgroundColor: '#E0E0E0',
            collapesButton_BackgroundColor_Hover: 'grey',
        }


    },
    'Light': {
        contentAndOption: {
            backgroundColor: 'darkYellow'
        },
        content: {
            continueButton_BackgroundColor: 'yellow',
            continueButton_BackgroundColor_Hover: "lightYellow",
            SwitchButton_BackgroundColor: 'yellow',
            SwitchButton_BackgroundColor_Hover: "lightYellow"
        },
        options: {
            optionButton_BackgroundColor: 'darkYellow',
            optionContent_BackgroundColor_Hover: 'yellow',
            collapesButton_BackgroundColor: 'yellow',
            collapesButton_BackgroundColor_Hover: 'lightYellow',


        }
    },
    'Colorblind': {
        contentAndOption: {
            backgroundColor: '#616161'
        },
        content: {
            continueButton_BackgroundColor: '#757575',
            continueButton_BackgroundColor_Hover: "#BDBDBD",
            SwitchButton_BackgroundColor: '#757575',
            SwitchButton_BackgroundColor_Hover: "#BDBDBD"
        },
        options: {
            optionButton_BackgroundColor: '#616161',
            optionContent_BackgroundColor_Hover: '#757575',
            collapesButton_BackgroundColor: '#757575',
            collapesButton_BackgroundColor_Hover: '"#BDBDBD',


        }
    }
}


