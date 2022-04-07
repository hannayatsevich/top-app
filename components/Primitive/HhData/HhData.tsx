import classnames from "classnames";
import styles from './HhData.module.css';
import {HhDataProps} from "./HhData.props";
import RateIcon from './rate.svg';
import {Card} from "@/components/index";
import {getRuPrice} from "@/helpers/index";

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary, className, updatedAt,  ...props}: HhDataProps):JSX.Element => {
    return (
        <div className={classnames(className, styles['hh-vacancies'])} {...props}>
            <Card className={styles['hh-count-card']}>
                <div className={styles['hh-title']}>Всего вакансий</div>
                <div className={styles['hh-count']}>{count}</div>
            </Card>
            <Card className={styles['hh-salaries']}>
                <div className={styles['hh-salary-level']}>
                    <div className={styles['hh-title']}>Начальный</div>
                    <div className={styles['hh-salary']}>{getRuPrice(juniorSalary)}</div>
                    <div className={styles['hh-rate']}>
                        <RateIcon className={styles['rate-filled']}/>
                        <RateIcon/>
                        <RateIcon/>
                    </div>
                </div>
                <div className={styles['hh-salary-level']}>
                    <div className={styles['hh-title']}>Средний</div>
                    <div className={styles['hh-salary']}>{getRuPrice(middleSalary)}</div>
                    <div className={styles['hh-rate']}>
                        <RateIcon className={styles['rate-filled']}/>
                        <RateIcon className={styles['rate-filled']}/>
                        <RateIcon/>
                    </div>
                </div>
                <div className={styles['hh-salary-level']}>
                    <div className={styles['hh-title']}>Профессионал</div>
                    <div className={styles['hh-salary']}>{getRuPrice(seniorSalary)}</div>
                    <div className={styles['hh-rate']}>
                        <RateIcon className={styles['rate-filled']}/>
                        <RateIcon className={styles['rate-filled']}/>
                        <RateIcon className={styles['rate-filled']}/>
                    </div>
                </div>
            </Card>
        </div>
    );
};