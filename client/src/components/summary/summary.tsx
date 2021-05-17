import { Spin } from '@library/spin';
import { Chart } from '@components/base/components/charts';
import { Widget, WidgetColor } from '@components/base/components/widget';
import './summary.scss';

export const Summary = () => {
    return (
        <div className="summary-container">
            <div className="summary">
                <div className="widgets">
                    <Widget
                        color={WidgetColor.Red}
                        title="Report Index"
                        contentTitle="Percentage"
                    >
                        65%
                    </Widget>
                    <Widget
                        color={WidgetColor.Blue}
                        title="Reported Order"
                    >
                        Tech Lead
                    </Widget>
                    <Widget
                        color={WidgetColor.Green}
                        title="Reported"
                        contentTitle="Percentage"
                    >
                        55%
                    </Widget>
                    <Widget color={WidgetColor.Purple} title="Trending Report">
                        React JS
                    </Widget>
                </div>
                <div className="charts">
                    <Spin spinning={false}>
                        <Chart
                        // options={{
                        //     chart: {
                        //         backgroundColor: 'transparent',
                        //         // height: (9.5 / 20) * 100 + '%',
                        //     },
                        //     // colors: ['#7bd6c7', '#a3e1d6'],
                        // }}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    );
};
