import * as THREE from 'three';
import { Scene } from 'three';

const starTexture = new THREE.TextureLoader().load( import.meta.env.BASE_URL + 'star.png');

const colorLibrary = [
    new THREE.Color( 0xffffff),
    new THREE.Color( 0xff99ff),
    new THREE.Color( 0x99ffff),
    new THREE.Color( 0xffff99),
    new THREE.Color( 0xff9999),
    new THREE.Color( 0x99ff99),
    new THREE.Color( 0x9999ff)
];

class Stars {

    constructor( numberOfStars = 0, minPosition = new THREE.Vector3(0, 0, 0), maxPosition = new THREE.Vector3(1, 1, 1)) {
        this.object = new THREE.Object3D();
        this.stars = Array(numberOfStars);

        for (let i = 0; i < this.stars.length; i++) {
            //generate position
            let starPos = new THREE.Vector3(
                THREE.MathUtils.randFloat(minPosition.x, maxPosition.x),
                THREE.MathUtils.randFloat(minPosition.y, maxPosition.y),
                THREE.MathUtils.randFloat(minPosition.z, maxPosition.z)
            )

            //generate color
            let starColor = colorLibrary[THREE.MathUtils.randInt(0, 6)];

            //generate update rate
            let starUpdateRate = THREE.MathUtils.randInt(1, 3);

            this.stars[i] = new Star(starPos, starColor, starUpdateRate);
            this.object.add(this.stars[i].starSprite);
        }

    }

    update(delta) {
        for( let i = 0; i < this.stars.length; i++) {
            //update the stars
            this.stars[i].update(delta);
        }
    }
}

class Star {
    constructor(position = new THREE.Vector3(), color = new THREE.Color(), updateRate = 1){
        this.updateRate = updateRate;

        //create a sprite?
        this.starMat = new THREE.SpriteMaterial({
            map: starTexture,
            color: color.getHex(),
        });

        this.starSprite = new THREE.Sprite(this.starMat);

        this.animationState = THREE.MathUtils.randFloat(0, Math.PI/2);

        this.scale =  Math.sin(this.animationState)/2 + 0.5;

        this.starSprite.scale.set(this.scale, this.scale, 1);
        this.starSprite.position.set(position.x, position.y, position.z);
    }

    update(delta){
        //make the star twinkel
        this.animationState += Math.PI/2 * this.updateRate * delta;
        this.animationState %= Math.PI * 2;

        this.scale =  Math.sin(this.animationState)/2 + 0.5;

        this.starSprite.scale.set(this.scale, this.scale, 1);
    }

}

export {Stars};