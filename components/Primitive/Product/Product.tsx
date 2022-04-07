import {ProductProps} from "./Product.props";
import styles from './Product.module.css';
import {Htag, Card, Button, Tag, Rating, Divider, Review, ReviewForm} from "../../../components";
import Link from 'next/link';
import Image from 'next/image';
import {ForwardedRef, forwardRef, useRef, useState} from "react";
import {getRuPrice, getWord} from "../../../helpers";
import classnames from "classnames";
import {motion} from 'framer-motion';

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>):JSX.Element => {
    const reviewVariants = {
        visible: {
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        hidden: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const {_id, image, title, oldPrice, price, credit, reviewCount, description, characteristics, advantages, disAdvantages, reviewAvg, initialRating, categories, tags, reviews} = product;
    const [isReviewsOpened, setIsReviewsOpened] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = (): void => {
        setIsReviewsOpened(state => !state);
        if(!isReviewsOpened){
            reviewRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            reviewRef.current?.focus({ preventScroll: true });
        }
    };

    return (
        <div className={classnames(className, styles['product-wrapper'])} {...props} ref={ref} role={'listitem'} aria-labelledby={'product-title'} >
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        className={styles.logo}
                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${image}`}
                        alt={title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}><Htag tag={'h3'} id={`product-title-${_id}`}>{title}</Htag></div>
                { !!price &&
                    <div className={styles.price}>
                        <span className={'hidden-element'}>цена</span>
                        {getRuPrice(price)}
                        <span className={'hidden-element'}>скидка</span>
                        {!!oldPrice && oldPrice - price > 0 && <Tag className={styles['price-tag']} color={'green'}>{getRuPrice(price - oldPrice)}</Tag>}
                    </div>
                }
                { !!credit &&
                    <div className={styles.credit}>
                        <span className={'hidden-element'}>цена в кредит</span>
                        {getRuPrice(credit)}
                        <span className={styles.perm}>/ мес</span>
                    </div>
                }
                <div className={classnames({
                    [styles['rating-full']]: !price && !credit,
                    [styles.rating]: !(!price && !credit)
                })}
                >
                    <span className={'hidden-element'}>{`рейтинг ${reviewAvg || initialRating}`}</span>
                    <Rating rating={reviewAvg || initialRating}/>
                </div>
                <div className={styles.categories}>{categories.map(category => <Tag className={styles.category} key={category}>{category}</Tag>)}</div>
                { !!price && <div className={styles['price-title']} aria-hidden={true}>цена</div> }
                { !!credit && <div className={styles['credit-title']} aria-hidden={true}>в кредит</div> }
                <div
                    className={classnames({
                        [styles['rate-title-full']]: !price && !credit,
                        [styles['rate-title']]: !(!price && !credit)
                    })}
                >
                    <a href={'#review'} onClick={scrollToReview}>{`${reviewCount} ${getWord(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}`}</a>
                </div>
                <Divider className={classnames(styles.divider, styles.divider1)}/>
                <div className={styles.description}>{description}</div>
                <div className={styles.characteristics}>
                    {characteristics.map(characteristic => !!(characteristic.name && characteristic.value) && <div className={styles.characteristic} key={characteristic.name + characteristic.value}>
                        <span className={styles['characteristic-title']}>{characteristic.name}</span>
                        <span className={styles['characteristic-divider']}/>
                        <span className={styles['characteristic-value']}>{characteristic.value}</span>
                    </div>)}
                    <div>{tags.map(tag => <Tag className={styles.category} key={tag}>{tag}</Tag>)}</div>
                </div>
                <div className={styles['advantages-disadvantages']}>
                    {
                        advantages &&
                        <div className={styles.advantages}>
                            <div className={styles['advantages-disadvantages-title']}>Преимущества</div>
                            <div>{advantages}</div>
                        </div>
                    }
                    {
                        disAdvantages &&
                        <div className={styles.disadvantages}>
                            <div className={styles['advantages-disadvantages-title']}>Недостатки</div>
                            <div>{disAdvantages}</div>
                        </div>
                    }
                </div>
                <Divider className={classnames(styles.divider, styles.divider2)}/>
                <div className={styles.buttons}>
                    <Link href={product.link}><a tabIndex={-1} target={'_blank'}><Button>Узнать подробнее</Button></a></Link>
                    <Button styleType={'ghost'} arrow={isReviewsOpened ? 'down' : 'right'} onClick={(): void => setIsReviewsOpened(state => !state)} aria-expanded={isReviewsOpened}>
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <motion.div
                className={styles['reviews-wrapper']}
                initial={isReviewsOpened ? 'visible' : 'hidden'}
                animate={isReviewsOpened ? 'visible' : 'hidden'}
                variants={reviewVariants}
            >
                <Card
                    className={styles.reviews}
                    color={'blue'}
                    ref={reviewRef}
                    tabIndex={isReviewsOpened ? 0 : -1}
                >
                    {reviews.map(review => <Review key={review._id} review={review}/>)}
                    <ReviewForm productId={_id} isOpened={isReviewsOpened}/>
                </Card>
            </motion.div>

        </div>
    );
}));
Product.displayName = 'Product';